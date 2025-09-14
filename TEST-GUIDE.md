# 🧪 Law Assistance Platform - Testing Guide

## 🚀 Quick Testing Setup

### Option 1: Test with In-Memory Database (Recommended for Quick Demo)

**Start Backend Test Server:**
```powershell
# Open PowerShell in the backend directory
cd C:\Users\ritsa\projects\law-assistance-platform\backend
powershell -ExecutionPolicy Bypass -Command "node test-server.js"
```

**Start Frontend (in a new PowerShell window):**
```powershell
# Open another PowerShell in the frontend directory
cd C:\Users\ritsa\projects\law-assistance-platform\frontend
powershell -ExecutionPolicy Bypass -Command "npm start"
```

### Option 2: Full MongoDB Setup

1. **Install MongoDB Community Server**: https://www.mongodb.com/try/download/community
2. **Start MongoDB Service**
3. **Use the main server**: `node server.js` instead of `test-server.js`

## 🎯 Testing Scenarios

### **1. User Registration & Authentication**
1. Go to http://localhost:3000
2. Click "Get Started" or "Register"
3. Fill out the registration form:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@test.com
   - Phone: +1-555-123-4567
   - Password: testpass123
   - Confirm Password: testpass123
4. Submit and verify you're redirected to dashboard

### **2. Report Analysis Testing**

**Test Different Report Types:**

**Emergency Report (Should trigger critical analysis):**
- Title: "Urgent medical emergency situation"
- Category: Medical Emergency
- Description: "Someone is unconscious and bleeding heavily after an accident"
- Expected: Critical severity, Emergency urgency, Medical services required

**Police Report (Should trigger police services):**
- Title: "Break-in at my apartment"
- Category: Theft
- Description: "I came home to find my apartment broken into and valuables stolen"
- Expected: High severity, Police services required

**Mental Health Report:**
- Title: "Severe anxiety and panic attacks"
- Category: Mental Health
- Description: "I've been having severe panic attacks and feeling suicidal thoughts"
- Expected: Mental health services required

**Legal Issue Report:**
- Title: "Workplace discrimination issue"
- Category: Discrimination  
- Description: "I'm being discriminated against at work due to my race"
- Expected: Legal services required

### **3. Emergency Features Testing**
1. Navigate to the Emergency page
2. Verify all emergency numbers are displayed
3. Test the "Call 911" button functionality
4. Check crisis text line information

### **4. Service Directory Testing**
1. Go to Services page
2. Verify service providers are displayed
3. Check different service types (lawyers, psychologists, emergency services)

### **5. Dashboard Functionality**
1. Check welcome message with user name
2. Verify quick action buttons work
3. Test emergency banner
4. Verify "No reports yet" message displays initially

## 🔍 What to Look For

### **Report Analysis Features:**
- ✅ Automatic categorization of reports
- ✅ Severity assessment (Low, Medium, High, Critical)
- ✅ Urgency determination (Routine, Urgent, Emergency)
- ✅ Service matching (Police, Medical, Mental Health, Legal)
- ✅ Intelligent recommendations
- ✅ Emergency detection and notifications

### **Security Features:**
- ✅ Password hashing and secure storage
- ✅ JWT token authentication
- ✅ Protected routes requiring login
- ✅ Input validation and sanitization

### **User Experience:**
- ✅ Responsive design (test on different screen sizes)
- ✅ Modern, professional UI
- ✅ Clear navigation and user flow
- ✅ Emergency information prominently displayed
- ✅ Accessibility features

## 🚨 Emergency Testing

**Test Emergency Detection:**
Try submitting reports with these keywords to trigger emergency responses:
- "emergency" 
- "urgent"
- "bleeding"
- "unconscious"
- "assault"
- "violence"
- "suicide"
- "threatening"

Watch the backend console for emergency notification logs.

## 📱 Mobile Testing

Test the responsive design:
1. Open browser developer tools (F12)
2. Toggle device toolbar
3. Test different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1200px+)

## 🔧 API Testing

You can test the API directly using these curl commands:

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"Test\",\"lastName\":\"User\",\"email\":\"test@example.com\",\"password\":\"testpass\",\"phone\":\"+1-555-0123\"}"
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"testpass\"}"
```

## ⚡ Performance Testing

### **Load Testing Scenarios:**
1. **Multiple Users**: Test with multiple browser tabs/users
2. **Report Volume**: Submit multiple reports quickly  
3. **Concurrent Registrations**: Test multiple user registrations
4. **Emergency Scenarios**: Test emergency detection under load

## 🐛 Common Issues & Solutions

### **Backend Issues:**
- **Port 5000 in use**: Change PORT in test-server.js
- **CORS errors**: Verify frontend URL in CORS settings
- **Token issues**: Clear browser localStorage and re-login

### **Frontend Issues:**
- **Blank page**: Check browser console for errors
- **API connection fails**: Verify backend is running on port 5000
- **Styling issues**: Ensure Tailwind CSS is properly configured

### **Testing Issues:**
- **Data not persisting**: This is expected with test-server.js (in-memory storage)
- **MongoDB connection**: Use test-server.js for quick testing without MongoDB

## 📊 Expected Test Results

After completing all tests, you should see:

1. **✅ User Registration/Login**: Seamless account creation and authentication
2. **✅ Report Intelligence**: Smart analysis of incident reports
3. **✅ Emergency Detection**: Automatic identification of critical situations
4. **✅ Service Matching**: Appropriate professional recommendations
5. **✅ Professional UI/UX**: Modern, responsive, accessible design
6. **✅ Security**: Secure authentication and data protection

## 🎉 Demo Script

For a quick demonstration:

1. **Start both servers** (backend test-server.js and frontend)
2. **Register a new user**
3. **Submit an emergency report**: "I was just assaulted and am bleeding"
4. **Show the analysis results**: Critical severity, Emergency urgency, Police + Medical services
5. **Navigate to Emergency page**: Show immediate help resources
6. **View Services directory**: Show available professionals

This demonstrates the core value proposition: **intelligent incident analysis with automatic service matching for emergency assistance**.

---

🔥 **Your MVP is now ready for testing and demonstration!**