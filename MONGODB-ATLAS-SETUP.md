# MongoDB Atlas Setup Guide

This guide will walk you through setting up MongoDB Atlas for your Law Assistance Platform.

## Step 1: Create MongoDB Atlas Account

1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" or "Sign Up"
3. Create an account using your email or sign up with Google/GitHub
4. Verify your email if required

## Step 2: Create a New Project

1. After logging in, click "New Project"
2. Name your project: `law-assistance-platform`
3. Click "Next"
4. Add team members if needed (optional for personal projects)
5. Click "Create Project"

## Step 3: Create a Database Cluster

1. Click "Create a Database" or "Build a Database"
2. Choose deployment option:
   - **FREE (M0)** - Perfect for development and small applications
   - Select "Shared" for the free tier
3. Configure cluster:
   - **Cloud Provider**: AWS (recommended)
   - **Region**: Choose closest to your users (e.g., US East for global, Asia Pacific for India)
   - **Cluster Tier**: M0 Sandbox (FREE)
4. **Cluster Name**: `law-assistance-cluster`
5. Click "Create Cluster"

## Step 4: Configure Database Security

### Create Database User
1. In the left sidebar, go to "Database Access"
2. Click "Add New Database User"
3. Authentication Method: "Password"
4. Username: `lawassistance-user` (or your preferred username)
5. Password: Generate a secure password or create your own
   - **IMPORTANT**: Save this password securely!
6. Database User Privileges:
   - Select "Built-in Role"
   - Choose "Read and write to any database"
7. Click "Add User"

### Configure Network Access
1. In the left sidebar, go to "Network Access"
2. Click "Add IP Address"
3. For Vercel deployment, you need to allow all IPs:
   - Click "Allow Access from Anywhere"
   - This adds `0.0.0.0/0` which allows all IP addresses
   - **Note**: This is required for Vercel serverless functions
4. Add a comment: "Vercel serverless functions"
5. Click "Confirm"

## Step 5: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Driver: "Node.js"
5. Version: "4.1 or later"
6. Copy the connection string - it looks like:
   ```
   mongodb+srv://<username>:<password>@law-assistance-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Configure Connection String

Replace the placeholders in your connection string:

```
mongodb+srv://lawassistance-user:YOUR_PASSWORD@law-assistance-cluster.xxxxx.mongodb.net/law_assistance?retryWrites=true&w=majority
```

**Important changes**:
- Replace `<username>` with your database username
- Replace `<password>` with your database password
- Add `/law_assistance` before the `?` to specify the database name

## Step 7: Test Connection (Optional)

Create a test script to verify your connection:

```javascript
// test-connection.js
const mongoose = require('mongoose');

const MONGODB_URI = 'your_connection_string_here';

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test creating a simple document
    const TestSchema = new mongoose.Schema({ test: String });
    const Test = mongoose.model('Test', TestSchema);
    
    const testDoc = new Test({ test: 'Connection successful' });
    await testDoc.save();
    
    console.log('✅ Test document created successfully!');
    
    // Clean up
    await Test.deleteOne({ test: 'Connection successful' });
    console.log('✅ Test document cleaned up!');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
```

## Step 8: Environment Variables

Once you have your connection string, you'll use it in these places:

### For Local Development (.env file):
```
MONGODB_URI=mongodb+srv://lawassistance-user:YOUR_PASSWORD@law-assistance-cluster.xxxxx.mongodb.net/law_assistance?retryWrites=true&w=majority
```

### For Vercel Deployment:
Add the same `MONGODB_URI` as an environment variable in your Vercel project dashboard.

## Step 9: Initialize Database Schema

After deployment, your database will automatically create collections when you:
1. Register your first user
2. Create your first report
3. Access any API endpoints

The Mongoose models will handle schema creation automatically.

## Security Best Practices

1. **Strong Password**: Use a complex password for your database user
2. **Environment Variables**: Never commit connection strings to your repository
3. **IP Whitelist**: For production, consider restricting IP access if possible
4. **Regular Backups**: MongoDB Atlas provides automatic backups on paid plans
5. **Monitor Usage**: Keep an eye on your database usage to avoid unexpected charges

## Troubleshooting

### Connection Issues
- Verify your username and password are correct
- Ensure network access is configured (0.0.0.0/0 for Vercel)
- Check if your IP is whitelisted
- Verify the connection string format

### Authentication Errors
- Double-check your database username and password
- Ensure the user has proper permissions
- Try recreating the database user if needed

### Timeout Issues
- Check your internet connection
- Verify the cluster region is accessible
- Consider using a different cloud provider region

## Database Structure

Your law assistance platform will use these main collections:
- `users` - User accounts and profiles
- `reports` - Incident reports and legal cases
- `serviceproviders` - Legal service providers and contacts
- `sessions` - User sessions (if needed)

## Monitoring and Maintenance

1. **Database Metrics**: Monitor in MongoDB Atlas dashboard
2. **Performance**: Check slow queries and optimize indexes
3. **Storage**: Monitor storage usage (500MB limit on free tier)
4. **Alerts**: Set up alerts for unusual activity

## Upgrading

If you outgrow the free tier:
- **M10 ($9/month)**: Dedicated clusters with more features
- **M20+ ($25+/month)**: Higher performance and storage
- **Shared Clusters**: Good for development and small applications

Your MongoDB Atlas database is now ready for production use with Vercel!