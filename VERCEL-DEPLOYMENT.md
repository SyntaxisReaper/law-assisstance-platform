# Vercel Deployment Guide

This guide will help you deploy the Law Assistance Platform to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a MongoDB database at [mongodb.com](https://mongodb.com/cloud/atlas)
3. **GitHub Repository**: Your code should be pushed to GitHub

## Environment Variables

Before deploying, you need to set up these environment variables in your Vercel project dashboard:

### Required Variables
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/law_assistance
JWT_SECRET=your-super-secure-jwt-secret-key-min-32-characters
NODE_ENV=production
```

### Optional Variables (for notifications)
```
FRONTEND_URL=https://your-app-name.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing this law assistance platform

### 2. Configure Build Settings

Vercel should automatically detect the configuration from `vercel.json`, but verify these settings:

- **Framework Preset**: Other
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `frontend/build`
- **Install Command**: `npm run install-all`

### 3. Add Environment Variables

In your Vercel project dashboard:

1. Go to "Settings" > "Environment Variables"
2. Add all the required environment variables listed above
3. Make sure to set them for "Production", "Preview", and "Development" environments

### 4. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at `https://your-app-name.vercel.app`

## Important Notes

### Database Setup
- Make sure your MongoDB Atlas cluster allows connections from `0.0.0.0/0` (all IPs) since Vercel functions run on dynamic IPs
- Create a database user with read/write permissions
- Use the connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database_name`

### API Endpoints
The application uses serverless functions for the backend API:
- Health check: `/api/health`
- Authentication: `/api/auth/login`, `/api/auth/register`
- Reports: `/api/reports` (when implemented)

### CORS Configuration
CORS is configured in `vercel.json` and individual API functions to allow cross-origin requests.

### Function Limits
- Each serverless function has a 10-second execution limit (hobby plan)
- Database connections are cached between function calls
- Consider upgrading to Pro plan for longer execution times if needed

## Troubleshooting

### Build Fails
- Check that all dependencies are listed in `package.json`
- Verify that the build commands are correct
- Check build logs for specific error messages

### API Not Working
- Verify environment variables are set correctly
- Check function logs in Vercel dashboard
- Ensure MongoDB connection string is correct and cluster is accessible

### CORS Issues
- Check that `FRONTEND_URL` environment variable matches your Vercel domain
- Verify CORS headers in API functions

## Monitoring

After deployment:
1. Check function logs in Vercel dashboard
2. Monitor function execution times
3. Set up error tracking if needed
4. Monitor database performance in MongoDB Atlas

## Local Development

To develop locally with the Vercel-ready setup:

```bash
# Install dependencies
npm run install-all

# Run frontend and backend locally
npm run dev

# Or run Vercel dev environment
npx vercel dev
```

## Updates and Redeploys

- Push changes to your GitHub repository
- Vercel will automatically redeploy
- Check deployment status in Vercel dashboard
- Environment variables persist between deployments

## Security Notes

- Never commit `.env` files to your repository
- Use strong, unique JWT secrets
- Regularly rotate API keys and tokens
- Monitor access logs for suspicious activity
- Keep dependencies updated