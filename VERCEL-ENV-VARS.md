# Required Environment Variables for Vercel Deployment

## In Vercel Dashboard → Settings → Environment Variables

Add these variables for both **Production** and **Preview** environments:

### Required Variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/law_assistance?retryWrites=true&w=majority
JWT_SECRET=your-secure-secret-key-min-32-characters-long
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Optional Variables:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-phone
```

## How to Add Variables:

1. Go to your Vercel project dashboard
2. Click "Settings" tab
3. Click "Environment Variables" in the left sidebar
4. Add each variable with Name/Value
5. Select environments (Production, Preview)
6. Click "Save"

## Important Notes:

- ✅ **MONGODB_URI**: Replace `username`, `password`, and `cluster` with your actual MongoDB Atlas credentials
- ✅ **JWT_SECRET**: Use a secure random string (minimum 32 characters)
- ✅ **FRONTEND_URL**: Will be `https://your-app-name.vercel.app` after deployment
- ⚠️ Make sure MongoDB Atlas allows connections from `0.0.0.0/0` (all IPs)
- ⚠️ Ensure your MongoDB user has read/write permissions

## Testing Environment Variables:

After deployment, test the API health check:
```
https://your-app-name.vercel.app/api/health
```

Should return:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "Law Assistance Platform API",
  "environment": "production"
}
```