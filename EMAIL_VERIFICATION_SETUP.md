# Email Verification Setup

This document explains how the email verification flow works in the ALANKAAR application.

## Overview

The application includes a complete email verification system that:

1. **Registration**: When a user registers, they receive a verification email
2. **Verification**: Users click the link in the email to verify their account
3. **Login Protection**: Users cannot log in until their email is verified
4. **Resend Verification**: Users can request a new verification email if needed

## Frontend Components

### 1. VerifyEmail Page (`/src/pages/VerifyEmail.tsx`)
- Handles email verification by extracting the token from URL parameters
- Shows loading, success, and error states
- Provides options to resend verification or go back to login

### 2. Updated Login Page (`/src/pages/Login.tsx`)
- Detects when login fails due to unverified email
- Shows a resend verification option
- Handles registration with email verification requirement

### 3. Updated AuthContext (`/src/contexts/AuthContext.tsx`)
- Handles email verification responses
- Includes `resendVerification` function
- Stores pending verification email in localStorage

## Backend API Endpoints

### 1. Registration (`POST /api/auth/register`)
- Creates user with email verification token
- Sends verification email
- Returns success message (user not logged in until verified)

### 2. Email Verification (`GET /api/auth/verify-email/:token`)
- Verifies email using token from URL
- Marks user as verified
- Clears verification token

### 3. Resend Verification (`POST /api/auth/resend-verification`)
- Generates new verification token
- Sends new verification email
- Updates token expiration

### 4. Login (`POST /api/auth/login`)
- Checks if email is verified before allowing login
- Returns `emailNotVerified: true` if email not verified

## Environment Variables Required

Make sure these environment variables are set in your `.env` file:

```env
# Frontend URL (for email links)
FRONTEND_URL=http://localhost:5173

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# JWT Secret
JWT_SECRET=your-jwt-secret

# API Base URL
VITE_API_BASE_URL=http://localhost:3000
```

## Email Configuration

### Gmail Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use the generated password in `EMAIL_PASSWORD`

### Email Template
The verification email includes:
- ALANKAAR branding
- Personalized greeting
- Verification button
- Fallback link
- 24-hour expiration notice

## User Flow

1. **User registers** → Receives verification email
2. **User clicks email link** → Redirected to `/verify-email?token=...`
3. **Verification page processes token** → Calls backend API
4. **Success** → User can now log in
5. **Failure** → User can request new verification email

## Testing

To test the email verification flow:

1. Start both frontend and backend servers
2. Register a new account
3. Check your email for verification link
4. Click the link to verify
5. Try logging in (should work after verification)
6. Test resend verification functionality

## Security Features

- Verification tokens expire after 24 hours
- Tokens are cryptographically secure (32-byte random)
- Email verification is required before login
- Failed verification attempts are logged
- Email sending failures don't break registration

## Troubleshooting

### Common Issues

1. **Email not sending**: Check email credentials and app password
2. **Verification link not working**: Ensure `FRONTEND_URL` is correct
3. **Token expired**: Use resend verification feature
4. **CORS issues**: Check API configuration

### Debug Steps

1. Check server logs for email sending errors
2. Verify environment variables are set correctly
3. Test email configuration with a simple test
4. Check browser network tab for API calls 