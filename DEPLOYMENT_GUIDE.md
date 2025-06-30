# ALANKAAR Deployment Guide - Single Deployment with Rewrites

This guide explains how to deploy the ALANKAAR application using Vercel's rewrite functionality to handle both frontend and backend routing in a single deployment.

## Overview

The application uses a single Vercel deployment with intelligent routing:
- **Frontend Routes**: `/`, `/products`, `/cart`, `/login`, etc. → Served by React app
- **API Routes**: `/api/auth/*`, `/api/products/*`, etc. → Served by Node.js backend
- **Single Domain**: Everything runs on one URL (e.g., `https://alankaar.vercel.app`)

## How Rewrites Work

The `vercel.json` configuration uses rewrites to route requests:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/server/index.js"
    },
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

- **API Requests**: `/api/*` → Go to Node.js server
- **All Other Requests**: `/*` → Go to React app (index.html)

## Prerequisites

1. Vercel account
2. MongoDB database (MongoDB Atlas recommended)
3. Gmail account for email sending
4. Environment variables configured

## Step 1: Deploy to Vercel

### 1.1 Connect Repository

1. Go to Vercel Dashboard
2. Click "New Project"
3. Import your repository
4. Set root directory to `/` (root of project)

### 1.2 Configure Build Settings

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 1.3 Environment Variables

Set these environment variables in Vercel:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alankaar

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Email (Gmail)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# Frontend URL (same as deployment URL)
VITE_API_BASE_URL=https://your-app.vercel.app
VITE_FRONTEND_URL=https://your-app.vercel.app
```

### 1.4 Deploy

Click "Deploy" and wait for the build to complete.

## Step 2: Test the Deployment

### 2.1 Test Frontend Routes

Visit these URLs to ensure they work:
- `https://your-app.vercel.app/`
- `https://your-app.vercel.app/products`
- `https://your-app.vercel.app/cart`
- `https://your-app.vercel.app/login`
- `https://your-app.vercel.app/verify-email`

### 2.2 Test API Endpoints

Test backend endpoints:
- `https://your-app.vercel.app/api/auth/register`
- `https://your-app.vercel.app/api/auth/login`
- `https://your-app.vercel.app/api/products`

### 2.3 Test Email Verification

1. Register a new account
2. Check email for verification link
3. Click the link - should work with the same domain
4. Verify the account is marked as verified

## Environment Variables Reference

### Required Environment Variables

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/alankaar

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Email (Gmail)
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# URLs (same domain for single deployment)
VITE_API_BASE_URL=https://your-app.vercel.app
VITE_FRONTEND_URL=https://your-app.vercel.app
```

## File Structure

```
alankaar/
├── src/                    # Frontend React code
├── server/                 # Backend Node.js code
├── public/                 # Static assets
├── package.json            # Frontend dependencies
├── vercel.json            # Vercel configuration
├── vite.config.ts         # Vite configuration
└── tailwind.config.ts     # Tailwind configuration
```

## How Routing Works

### Frontend Routes (React Router)
- `/` → Home page
- `/products` → Products page
- `/cart` → Cart page
- `/login` → Login page
- `/verify-email` → Email verification page
- `/admin/*` → Admin pages

### API Routes (Express.js)
- `/api/auth/register` → User registration
- `/api/auth/login` → User login
- `/api/auth/verify-email` → Email verification
- `/api/auth/resend-verification` → Resend verification email
- `/api/products` → Get products
- `/api/orders` → Order management

## Benefits of This Approach

1. **Single Deployment**: Everything in one place
2. **No CORS Issues**: Same domain for frontend and backend
3. **Simplified Setup**: One set of environment variables
4. **Cost Effective**: Single Vercel project
5. **Easy Debugging**: All logs in one place
6. **Direct URL Access**: All React routes work perfectly

## Troubleshooting

### Common Issues

1. **Frontend Routes Not Working**:
   - Check `vercel.json` rewrites configuration
   - Ensure build output is in `dist` directory
   - Verify React Router is properly configured

2. **API Routes Not Working**:
   - Check that server files are in `server/` directory
   - Verify `server/index.js` exists and exports properly
   - Check Vercel function logs

3. **Email Not Sending**:
   - Verify Gmail app password is correct
   - Check `EMAIL_USER` and `EMAIL_PASSWORD` are set
   - Check Vercel function logs for email errors

4. **Database Connection Issues**:
   - Verify MongoDB URI is correct
   - Check network access in MongoDB Atlas
   - Ensure database user has proper permissions

### Debug Steps

1. **Check Vercel Logs**:
   - Go to project dashboard
   - Click on "Functions" tab
   - Check function logs for errors

2. **Test API Directly**:
   - Use Postman or curl to test backend endpoints
   - Verify responses are correct

3. **Check Environment Variables**:
   - Verify all variables are set correctly
   - Check for typos in variable names

4. **Test Build Locally**:
   ```bash
   npm run build
   npm run preview
   ```

## Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **JWT Secrets**: Use strong, unique secrets
3. **Database**: Use connection string with proper authentication
4. **Email**: Use app passwords, not regular passwords
5. **CORS**: Not needed since same domain

## Monitoring

1. **Vercel Analytics**: Monitor frontend performance
2. **Function Logs**: Monitor backend API calls
3. **MongoDB Atlas**: Monitor database performance
4. **Email Delivery**: Monitor email sending success rates

## Local Development

For local development, you can run both frontend and backend:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run backend
```

The application will work the same way locally with the rewrite configuration. 