import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

export function AuthTest() {
  const { user, token } = useAuth();
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testAuthRequest = async () => {
    setLoading(true);
    try {
      // Test a protected endpoint
      const data = await api.get('/users');
      setTestResult(JSON.stringify(data, null, 2));
      toast({
        title: "Success!",
        description: "Authenticated request worked!",
      });
    } catch (error: any) {
      setTestResult(`Error: ${error.message}`);
      toast({
        title: "Error",
        description: error.message || "Request failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Authentication Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please log in to test JWT authentication.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>JWT Authentication Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">User</label>
            <p className="text-sm">{user.name} ({user.email})</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Token Status</label>
            <p className="text-sm">{token ? '✅ Present' : '❌ Missing'}</p>
          </div>
        </div>
        
        <Button onClick={testAuthRequest} disabled={loading}>
          {loading ? 'Testing...' : 'Test Authenticated Request'}
        </Button>
        
        {testResult && (
          <div>
            <label className="text-sm font-medium text-muted-foreground">Result</label>
            <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto max-h-40">
              {testResult}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 