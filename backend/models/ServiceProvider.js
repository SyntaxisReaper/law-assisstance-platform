const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service provider name is required'],
    trim: true,
    maxLength: [200, 'Name cannot exceed 200 characters']
  },
  type: {
    type: String,
    required: true,
    enum: ['police_station', 'hospital', 'lawyer', 'psychologist', 'mental_health_center', 
           'social_services', 'emergency_services', 'court', 'legal_aid']
  },
  specialization: [{
    type: String,
    enum: ['criminal_law', 'civil_law', 'family_law', 'corporate_law', 'immigration',
           'personal_injury', 'bankruptcy', 'real_estate', 'employment', 'tax_law',
           'emergency_medicine', 'trauma_care', 'mental_health', 'substance_abuse',
           'domestic_violence', 'child_protection', 'elderly_care', 'disability_services']
  }],
  contact: {
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
    },
    email: {
      type: String,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    emergencyPhone: String,
    fax: String,
    website: String
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'USA'
    }
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
      index: '2dsphere'
    }
  },
  operatingHours: {
    monday: { open: String, close: String, is24Hours: Boolean },
    tuesday: { open: String, close: String, is24Hours: Boolean },
    wednesday: { open: String, close: String, is24Hours: Boolean },
    thursday: { open: String, close: String, is24Hours: Boolean },
    friday: { open: String, close: String, is24Hours: Boolean },
    saturday: { open: String, close: String, is24Hours: Boolean },
    sunday: { open: String, close: String, is24Hours: Boolean }
  },
  availability: {
    emergency: {
      type: Boolean,
      default: false
    },
    acceptsWalkIns: {
      type: Boolean,
      default: true
    },
    appointmentRequired: {
      type: Boolean,
      default: false
    },
    languages: [{
      type: String,
      default: ['English']
    }]
  },
  credentials: {
    licenseNumber: String,
    certifications: [String],
    yearsOfExperience: Number,
    education: String,
    barAdmission: [String] // For lawyers - states where admitted to practice
  },
  ratings: {
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    reviews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      comment: String,
      date: {
        type: Date,
        default: Date.now
      },
      isVerified: {
        type: Boolean,
        default: false
      }
    }]
  },
  services: [{
    name: String,
    description: String,
    estimatedCost: {
      min: Number,
      max: Number,
      currency: { type: String, default: 'USD' }
    },
    duration: String // e.g., "1 hour", "30 minutes"
  }],
  insurance: {
    accepted: [String], // List of accepted insurance providers
    notes: String
  },
  pricing: {
    consultationFee: Number,
    hourlyRate: Number,
    flatFees: [{
      service: String,
      amount: Number
    }],
    paymentOptions: [String] // cash, credit, insurance, etc.
  },
  capacity: {
    current: Number,
    maximum: Number,
    waitTime: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'temporarily_closed', 'permanently_closed'],
    default: 'active'
  },
  verification: {
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verificationDate: Date,
    documents: [{
      type: String,
      filename: String,
      uploadDate: { type: Date, default: Date.now }
    }]
  },
  emergencyProtocols: {
    responseTime: String, // e.g., "5-10 minutes"
    coverage_area: [String], // ZIP codes or areas covered
    equipment: [String],
    staff_on_call: Number
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for location-based queries
serviceProviderSchema.index({ location: '2dsphere' });
serviceProviderSchema.index({ type: 1, 'address.city': 1, 'address.state': 1 });
serviceProviderSchema.index({ specialization: 1 });
serviceProviderSchema.index({ 'ratings.averageRating': -1 });

// Update average rating when new review is added
serviceProviderSchema.methods.updateRating = function() {
  if (this.ratings.reviews.length > 0) {
    const sum = this.ratings.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.ratings.averageRating = sum / this.ratings.reviews.length;
    this.ratings.totalReviews = this.ratings.reviews.length;
  } else {
    this.ratings.averageRating = 0;
    this.ratings.totalReviews = 0;
  }
};

// Check if currently open
serviceProviderSchema.methods.isCurrentlyOpen = function() {
  const now = new Date();
  const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
  
  const todayHours = this.operatingHours[dayOfWeek];
  if (!todayHours || todayHours.is24Hours) return todayHours?.is24Hours || false;
  
  return currentTime >= todayHours.open && currentTime <= todayHours.close;
};

// Calculate distance from a point
serviceProviderSchema.methods.getDistanceFrom = function(longitude, latitude) {
  const [providerLng, providerLat] = this.location.coordinates;
  const R = 3959; // Earth's radius in miles
  
  const dLat = (providerLat - latitude) * Math.PI / 180;
  const dLng = (providerLng - longitude) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(latitude * Math.PI / 180) * Math.cos(providerLat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
};

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);