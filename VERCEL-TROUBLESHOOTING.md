# Vercel Deployment Troubleshooting Guide

## Common Deployment Issues and Solutions

### 1. Build Failures

#### Error: "Build failed"
**Possible Causes:**
- Missing dependencies
- Build script issues
- Environment variables not set
- File path issues

**Solutions:**
1. Check build logs in Vercel dashboard for specific error messages
2. Ensure all dependencies are in `package.json`
3. Test build locally first:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

#### Error: "Module not found" during build
**Solution:**
- Add missing dependencies to root `package.json`:
  ```json
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "express-validator": "^7.0.1"
  }
  ```

### 2. API Function Issues

#### Error: "Function execution timed out"
**Causes:**
- Database connection issues
- Long-running operations
- Infinite loops

**Solutions:**
1. Check MongoDB Atlas connection string
2. Ensure database allows connections from `0.0.0.0/0`
3. Add timeout handling in API functions

#### Error: "Cannot resolve module"
**Solution:**
- Ensure all API dependencies are in root `package.json`
- Check import paths in API functions

### 3. Environment Variable Issues

#### Error: "MONGODB_URI is not defined"
**Solution:**
1. Go to Vercel project dashboard
2. Settings → Environment Variables
3. Add required variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string (32+ characters)
   - `NODE_ENV`: `production`

### 4. Frontend Build Issues

#### Error: "npm ERR! missing script: build"
**Solution:**
- Ensure `frontend/package.json` has build script:
  ```json
  "scripts": {
    "build": "react-scripts build"
  }
  ```

#### Error: "React build failed"
**Solutions:**
1. Check for TypeScript errors
2. Fix any linting errors
3. Ensure all imports are correct

### 5. Routing Issues

#### Error: "404 on page refresh"
**Solution:**
- Use the correct `vercel.json` routing configuration
- Ensure SPA fallback is configured

### 6. Database Connection Issues

#### Error: "MongoServerError: Authentication failed"
**Solutions:**
1. Check username/password in connection string
2. Ensure database user has correct permissions
3. Verify the database user exists in MongoDB Atlas

#### Error: "MongoNetworkError"
**Solutions:**
1. Check internet connectivity
2. Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
3. Check if MongoDB Atlas cluster is running

## Step-by-Step Deployment Process

### 1. Pre-deployment Checklist
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas cluster created and configured
- [ ] Database user created with read/write permissions
- [ ] IP whitelist set to `0.0.0.0/0`
- [ ] Connection string tested locally

### 2. Vercel Setup
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure build settings (should auto-detect)
4. Add environment variables

### 3. Environment Variables to Add
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/law_assistance
JWT_SECRET=your-secure-secret-key-min-32-characters
NODE_ENV=production
```

### 4. Test Deployment
1. Deploy and check build logs
2. Test API endpoints: `/api/health`
3. Test frontend loading
4. Check browser console for errors

## Debug Commands

### Test MongoDB Connection Locally
```bash
node test-mongodb-connection.js
```

### Test API Functions Locally
```bash
cd frontend
npm start
# In another terminal
node ../api/health.js  # Won't work directly, need proper setup
```

### Build Frontend Locally
```bash
cd frontend
npm install
npm run build
```

## Common Error Messages and Solutions

### "Build Command Failed"
- Check `vercel.json` configuration
- Ensure build scripts are correct
- Check for missing dependencies

### "Function Invocation Timeout"
- Database connection taking too long
- Check MongoDB Atlas connection
- Optimize database queries

### "Module Resolution Error"
- Import paths are incorrect
- Dependencies missing from `package.json`
- Case sensitivity issues on deployment

### "CORS Error"
- API functions need proper CORS headers
- Check `Access-Control-Allow-Origin` settings

## Quick Fixes to Try

1. **Redeploy from Vercel Dashboard**
   - Go to Deployments tab
   - Click "Redeploy" on latest deployment

2. **Clear Build Cache**
   - In Vercel dashboard: Settings → General
   - Scroll down to "Build & Output Settings"
   - Clear build cache

3. **Check Function Logs**
   - Go to Functions tab in Vercel dashboard
   - Click on specific function to see logs
   - Look for error messages

4. **Verify Environment Variables**
   - Settings → Environment Variables
   - Make sure all required variables are set
   - Test with preview deployment first

## Alternative Deployment Strategy

If the current setup continues failing, try this simpler approach:

1. **Frontend Only Deployment**
   - Deploy frontend to Vercel
   - Deploy backend separately (Railway, Render, etc.)
   - Update API URLs in frontend

2. **Monorepo Structure**
   - Move frontend files to root
   - Keep API in `/api` folder
   - Simplify `vercel.json`

## Getting Help

1. **Check Vercel Build Logs**
   - Most important: look at the actual error messages
   - Build logs show exactly what failed

2. **Check Function Logs**
   - Runtime errors appear in function logs
   - Database connection errors show here

3. **Test Locally First**
   - Always test builds and functionality locally
   - Use `npm run build` to test frontend build
   - Test API functions with tools like Postman

Remember: The most important step is to check the actual error messages in the Vercel dashboard build logs. They will tell you exactly what's failing.