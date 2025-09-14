# Law Assistance Platform

A comprehensive web platform that enables users to report incidents and automatically connects them with appropriate emergency services, legal professionals, and mental health support.

## 🚀 Features

### Core Functionality
- **Intelligent Report Analysis**: AI-powered system analyzes incident reports to determine severity, urgency, and required services
- **Emergency Service Integration**: Automatic notification to police, medical, and mental health services for critical situations
- **Service Provider Directory**: Access to verified lawyers, psychologists, and emergency contacts
- **Real-time Emergency Support**: 24/7 availability with immediate emergency contact information
- **Secure User Management**: JWT-based authentication with encrypted data storage

### Key Components
- **Smart Report Processing**: Automatically categorizes incidents and determines required help
- **Emergency Detection**: Identifies critical situations requiring immediate response
- **Service Matching**: Connects users with appropriate professionals based on incident type
- **Progress Tracking**: Monitor report status and get updates from service providers
- **Mobile-Responsive Design**: Works seamlessly on all devices

## 🛠 Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Express Validator** for input validation

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **TailwindCSS** for modern UI styling
- **Lucide React** for icons
- **Axios** for API communication

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (version 16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd law-assistance-platform
```

### 2. Install Dependencies
```bash
npm run install-all
```

### 3. Set Up Environment Variables

**Backend Configuration** (`backend/.env`):
```env
# Database
MONGODB_URI=mongodb://localhost:27017/law_assistance

# JWT Secret (change in production)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (optional for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Frontend Configuration** (`frontend/.env`):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
mongod

# Or if using MongoDB as a service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

### 5. Seed the Database (Optional)
```bash
cd backend
npm run seed
```

### 6. Start the Application
```bash
# From the root directory
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend application on http://localhost:3000

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start  # Starts React development server
```

### Database Management
```bash
cd backend
npm run seed  # Seed database with sample data
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Report Management
- `POST /api/reports` - Create new report
- `GET /api/reports` - Get user's reports
- `GET /api/reports/:id` - Get specific report
- `PUT /api/reports/:id/status` - Update report status

### Service Directory
- `GET /api/services` - Get service providers
- `GET /api/services/:id` - Get specific service provider
- `GET /api/services/emergency/nearest` - Get nearest emergency services

### Emergency Services
- `POST /api/emergency/alert` - Send emergency alert
- `GET /api/emergency/numbers` - Get emergency contact numbers

## 🎯 Usage Guide

### For Users

1. **Registration/Login**
   - Create an account with basic information
   - Secure login with email and password

2. **Filing a Report**
   - Navigate to "New Report" from the dashboard
   - Provide detailed incident information
   - System automatically analyzes and categorizes the report
   - Appropriate services are notified for urgent cases

3. **Emergency Situations**
   - Use the Emergency page for immediate help
   - Call 911 for life-threatening situations
   - Access crisis hotlines and text support

4. **Tracking Reports**
   - View all reports in the "My Reports" section
   - Track status updates and communications

### Report Analysis System

The platform automatically analyzes reports using keyword detection and categorization:

**Severity Levels**: Low, Medium, High, Critical
**Urgency Levels**: Routine, Urgent, Emergency
**Service Categories**: Police, Medical, Mental Health, Legal, Social Services

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: bcrypt with salt rounds
- **Input Validation**: Express Validator for all inputs
- **Rate Limiting**: Protection against brute force attacks
- **CORS Protection**: Cross-origin request security
- **Helmet**: Security headers for HTTP responses

## 🌐 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Use strong JWT secrets
3. Configure production database
4. Set up email/SMS services for notifications
5. Enable HTTPS

### Production Considerations
- Use environment variables for all sensitive data
- Implement proper logging and monitoring
- Set up database backups
- Configure reverse proxy (nginx)
- Use process manager (PM2)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Emergency Information

**Important**: This platform is designed to assist with incident reporting and connecting users with appropriate services. 

**In case of immediate danger:**
- **Call 911** for police, fire, or medical emergencies
- **Call 988** for suicide prevention and crisis support
- **Call 1-800-799-7233** for domestic violence support

This platform supplements but does not replace emergency services.

## 📞 Support

For technical support or questions about the platform, please:
1. Check the documentation
2. Search existing issues on GitHub
3. Create a new issue with detailed information
4. Contact the development team

---

**Built with ❤️ for community safety and legal assistance**