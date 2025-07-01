import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getApiUrl } from '@/config/environment';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const status = searchParams.get('status');
      const error = searchParams.get('error');
      
      // Handle errors from backend redirect
      if (error) {
        setVerificationStatus('error');
        switch (error) {
          case 'no-token':
            setErrorMessage('No verification token found in the URL.');
            break;
          case 'invalid-token':
            setErrorMessage('Invalid or expired verification token. Please request a new verification email.');
            break;
          case 'server-error':
            setErrorMessage('Server error occurred. Please try again later.');
            break;
          default:
            setErrorMessage('Verification failed. Please try again.');
        }
        return;
      }

      // Handle success from backend redirect
      if (status === 'success' && token) {
        setVerificationStatus('success');
        toast({
          title: "Email verified successfully!",
          description: "You can now log in to your account.",
        });
        return;
      }
      
      // Handle direct API call (if token exists but no status)
      if (token && !status) {
        try {
          const response = await fetch(getApiUrl(`/auth/verify-email/${token}`), {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          });

          const data = await response.json();

          if (response.ok) {
            setVerificationStatus('success');
            toast({
              title: "Email verified successfully!",
              description: "You can now log in to your account.",
            });
          } else {
            setVerificationStatus('error');
            setErrorMessage(data.message || 'Verification failed. Please try again.');
          }
        } catch (error) {
          console.error('Verification error:', error);
          setVerificationStatus('error');
          setErrorMessage('Network error. Please check your connection and try again.');
        }
        return;
      }

      // No token found
      if (!token) {
        setVerificationStatus('error');
        setErrorMessage('No verification token found in the URL.');
        return;
      }
    };

    verifyEmail();
  }, [searchParams]);

  const handleResendVerification = async () => {
    // This would typically require the user's email
    // For now, we'll redirect to login where they can request a new verification
    navigate('/login');
  };

  if (verificationStatus === 'loading') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <Loader2 className="h-12 w-12 text-blue-500 mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-bold mb-2">Verifying Email</h1>
              <p className="text-muted-foreground">
                Please wait while we verify your email address...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <Card>
          <CardContent className="p-8">
            {verificationStatus === 'success' ? (
              <>
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2 text-green-600">Email Verified!</h1>
                <p className="text-muted-foreground mb-6">
                  Your email has been successfully verified. You can now log in to your account.
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link to="/login">Continue to Login</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/">Go to Home</Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2 text-red-600">Verification Failed</h1>
                <p className="text-muted-foreground mb-6">
                  {errorMessage}
                </p>
                <div className="space-y-3">
                  <Button onClick={handleResendVerification} className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Request New Verification
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login">Back to Login</Link>
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 