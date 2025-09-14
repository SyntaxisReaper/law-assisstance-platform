const mongoose = require('mongoose');
const ServiceProvider = require('../models/ServiceProvider');
require('dotenv').config();

const sampleServiceProviders = [
  // Police Stations
  {
    name: "Central Police Station",
    type: "police_station",
    contact: {
      phone: "555-911-0001",
      emergencyPhone: "911",
      email: "central@police.gov"
    },
    address: {
      street: "100 Main St",
      city: "Downtown",
      state: "CA",
      zipCode: "90210"
    },
    location: {
      type: "Point",
      coordinates: [-118.2437, 34.0522]
    },
    isEmergency: true,
    isActive: true
  },
  {
    name: "North District Police",
    type: "police_station",
    contact: {
      phone: "555-911-0002",
      emergencyPhone: "911"
    },
    address: {
      street: "500 North Ave",
      city: "Northside",
      state: "CA",
      zipCode: "90211"
    },
    location: {
      type: "Point",
      coordinates: [-118.2537, 34.0622]
    },
    isEmergency: true,
    isActive: true
  },

  // Hospitals
  {
    name: "General Hospital",
    type: "hospital",
    contact: {
      phone: "555-911-1001",
      emergencyPhone: "911",
      email: "emergency@generalhospital.com"
    },
    address: {
      street: "200 Health Blvd",
      city: "Medical Center",
      state: "CA",
      zipCode: "90212"
    },
    location: {
      type: "Point",
      coordinates: [-118.2337, 34.0422]
    },
    specialization: ["emergency_medicine", "trauma_care"],
    isEmergency: true,
    isActive: true
  },
  {
    name: "St. Mary's Medical Center",
    type: "hospital",
    contact: {
      phone: "555-911-1002",
      emergencyPhone: "911"
    },
    address: {
      street: "300 Care Way",
      city: "Westside",
      state: "CA",
      zipCode: "90213"
    },
    location: {
      type: "Point",
      coordinates: [-118.2637, 34.0322]
    },
    specialization: ["emergency_medicine", "mental_health"],
    isEmergency: true,
    isActive: true
  },

  // Lawyers
  {
    name: "Smith & Associates Law Firm",
    type: "lawyer",
    contact: {
      phone: "555-LAW-0001",
      email: "contact@smithlaw.com"
    },
    address: {
      street: "400 Legal Plaza",
      city: "Downtown",
      state: "CA",
      zipCode: "90214"
    },
    location: {
      type: "Point",
      coordinates: [-118.2437, 34.0522]
    },
    specialization: ["criminal_law", "personal_injury"],
    isActive: true
  },
  {
    name: "Johnson Family Law",
    type: "lawyer",
    contact: {
      phone: "555-LAW-0002",
      email: "info@johnsonlaw.com"
    },
    address: {
      street: "150 Justice St",
      city: "Uptown",
      state: "CA",
      zipCode: "90215"
    },
    location: {
      type: "Point",
      coordinates: [-118.2237, 34.0722]
    },
    specialization: ["family_law", "domestic_violence"],
    isActive: true
  },
  {
    name: "Davis Criminal Defense",
    type: "lawyer",
    contact: {
      phone: "555-LAW-0003",
      email: "help@davisdefense.com"
    },
    address: {
      street: "750 Court Ave",
      city: "Legal District",
      state: "CA",
      zipCode: "90216"
    },
    location: {
      type: "Point",
      coordinates: [-118.2137, 34.0622]
    },
    specialization: ["criminal_law", "civil_law"],
    isActive: true
  },

  // Psychologists
  {
    name: "Dr. Sarah Wilson, PhD",
    type: "psychologist",
    contact: {
      phone: "555-PSY-0001",
      email: "dr.wilson@therapycenter.com"
    },
    address: {
      street: "250 Wellness Way",
      city: "Therapy District",
      state: "CA",
      zipCode: "90217"
    },
    location: {
      type: "Point",
      coordinates: [-118.2337, 34.0422]
    },
    specialization: ["trauma", "mental_health"],
    isActive: true
  },
  {
    name: "Mindful Health Psychology",
    type: "psychologist",
    contact: {
      phone: "555-PSY-0002",
      email: "contact@mindfulhealth.com"
    },
    address: {
      street: "180 Calm Street",
      city: "Peaceful Heights",
      state: "CA",
      zipCode: "90218"
    },
    location: {
      type: "Point",
      coordinates: [-118.2537, 34.0322]
    },
    specialization: ["anxiety", "substance_abuse"],
    isActive: true
  },

  // Mental Health Centers
  {
    name: "Community Mental Health Center",
    type: "mental_health_center",
    contact: {
      phone: "555-MHC-0001",
      emergencyPhone: "988",
      email: "crisis@communitymhc.org"
    },
    address: {
      street: "350 Support Ave",
      city: "Community Center",
      state: "CA",
      zipCode: "90219"
    },
    location: {
      type: "Point",
      coordinates: [-118.2437, 34.0622]
    },
    specialization: ["mental_health", "substance_abuse"],
    isEmergency: true,
    isActive: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/law_assistance', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('📦 Connected to MongoDB for seeding...');

    // Clear existing service providers
    await ServiceProvider.deleteMany({});
    console.log('🗑️  Cleared existing service providers');

    // Insert sample data
    const insertedProviders = await ServiceProvider.insertMany(sampleServiceProviders);
    console.log(`✅ Inserted ${insertedProviders.length} service providers`);

    // Display summary
    const summary = await ServiceProvider.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]);

    console.log('\n📊 Service Provider Summary:');
    summary.forEach(item => {
      console.log(`  ${item._id}: ${item.count}`);
    });

    console.log('\n🎉 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleServiceProviders };