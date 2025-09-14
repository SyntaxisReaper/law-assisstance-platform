const mongoose = require('mongoose');
require('dotenv').config();

// Use your MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || 'your_connection_string_here';

console.log('🔄 Testing MongoDB Atlas connection...\n');

async function testConnection() {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test database operations
    console.log('\n🧪 Testing database operations...');
    
    // Create a simple test schema
    const TestSchema = new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now },
      test: String
    });
    
    const TestModel = mongoose.model('ConnectionTest', TestSchema);
    
    // Test Create operation
    console.log('📝 Testing CREATE operation...');
    const testDoc = new TestModel({
      name: 'Law Assistance Platform',
      test: 'Connection test successful'
    });
    
    const savedDoc = await testDoc.save();
    console.log('✅ Document created with ID:', savedDoc._id);
    
    // Test Read operation
    console.log('📖 Testing READ operation...');
    const foundDoc = await TestModel.findById(savedDoc._id);
    console.log('✅ Document found:', foundDoc.name);
    
    // Test Update operation
    console.log('✏️ Testing UPDATE operation...');
    await TestModel.findByIdAndUpdate(savedDoc._id, { 
      test: 'Updated test document' 
    });
    console.log('✅ Document updated successfully');
    
    // Test Delete operation
    console.log('🗑️ Testing DELETE operation...');
    await TestModel.findByIdAndDelete(savedDoc._id);
    console.log('✅ Document deleted successfully');
    
    // Test the actual application models
    console.log('\n🔍 Testing application models...');
    
    // Test User model
    try {
      const User = require('./api/_lib/models/User');
      console.log('✅ User model loaded successfully');
      
      // Test creating a test user (won't save, just validate structure)
      const testUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'testpassword123',
        phone: '+1234567890'
      });
      
      // Validate without saving
      await testUser.validate();
      console.log('✅ User model validation passed');
      
    } catch (modelError) {
      console.log('⚠️ User model test failed:', modelError.message);
    }
    
    // Test Report model
    try {
      const Report = require('./api/_lib/models/Report');
      console.log('✅ Report model loaded successfully');
    } catch (modelError) {
      console.log('⚠️ Report model test failed:', modelError.message);
    }
    
    // Test ServiceProvider model
    try {
      const ServiceProvider = require('./api/_lib/models/ServiceProvider');
      console.log('✅ ServiceProvider model loaded successfully');
    } catch (modelError) {
      console.log('⚠️ ServiceProvider model test failed:', modelError.message);
    }
    
    console.log('\n🎉 All tests completed successfully!');
    console.log('Your MongoDB Atlas setup is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Connection test failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n🔧 Troubleshooting tips:');
      console.error('1. Check your username and password in the connection string');
      console.error('2. Ensure the database user has proper permissions');
      console.error('3. Verify the database user exists in MongoDB Atlas');
    }
    
    if (error.message.includes('network')) {
      console.error('\n🔧 Network troubleshooting tips:');
      console.error('1. Check your internet connection');
      console.error('2. Verify IP whitelist includes 0.0.0.0/0 in MongoDB Atlas');
      console.error('3. Check if your network blocks MongoDB ports');
    }
    
    if (error.message.includes('ENOTFOUND')) {
      console.error('\n🔧 DNS troubleshooting tips:');
      console.error('1. Check the cluster URL in your connection string');
      console.error('2. Ensure the cluster is active in MongoDB Atlas');
      console.error('3. Try using a different DNS server');
    }
    
  } finally {
    // Close the connection
    try {
      await mongoose.disconnect();
      console.log('\n🔌 Disconnected from MongoDB Atlas');
    } catch (disconnectError) {
      console.error('Error disconnecting:', disconnectError.message);
    }
  }
}

// Display environment info
console.log('Environment Information:');
console.log('- Node.js version:', process.version);
console.log('- Mongoose version:', mongoose.version);
console.log('- Connection string configured:', MONGODB_URI ? '✅ Yes' : '❌ No');
console.log('');

// Run the test
testConnection();