const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Report title is required'],
    trim: true,
    maxLength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Report description is required'],
    trim: true,
    maxLength: [5000, 'Description cannot exceed 5000 characters']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'criminal', 'civil', 'domestic_violence', 'harassment', 
      'theft', 'assault', 'fraud', 'property_damage', 
      'traffic_accident', 'medical_emergency', 'mental_health',
      'cybercrime', 'discrimination', 'other'
    ]
  },
  severity: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  urgency: {
    type: String,
    required: true,
    enum: ['routine', 'urgent', 'emergency'],
    default: 'routine'
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  incidentDate: {
    type: Date,
    required: true
  },
  reportDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'in_progress', 'resolved', 'closed', 'escalated'],
    default: 'pending'
  },
  services_required: {
    police: { type: Boolean, default: false },
    medical: { type: Boolean, default: false },
    mental_health: { type: Boolean, default: false },
    legal: { type: Boolean, default: false },
    social_services: { type: Boolean, default: false }
  },
  evidence: [{
    type: {
      type: String,
      enum: ['image', 'document', 'audio', 'video', 'other']
    },
    filename: String,
    originalName: String,
    path: String,
    size: Number,
    uploadDate: { type: Date, default: Date.now }
  }],
  witnesses: [{
    name: String,
    phone: String,
    email: String,
    statement: String
  }],
  involvedParties: [{
    name: String,
    role: {
      type: String,
      enum: ['suspect', 'victim', 'witness', 'other']
    },
    contact: String,
    description: String
  }],
  assignedTo: [{
    serviceType: {
      type: String,
      enum: ['police', 'medical', 'legal', 'mental_health', 'social']
    },
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceProvider'
    },
    assignedDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['assigned', 'contacted', 'in_progress', 'completed'],
      default: 'assigned'
    }
  }],
  updates: [{
    message: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: { type: Date, default: Date.now },
    type: {
      type: String,
      enum: ['status_update', 'assignment', 'communication', 'resolution'],
      default: 'status_update'
    }
  }],
  priority_score: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  keywords: [String],
  isAnonymous: {
    type: Boolean,
    default: false
  },
  followUpRequired: {
    type: Boolean,
    default: true
  },
  followUpDate: Date,
  resolution: {
    summary: String,
    outcome: String,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedDate: Date
  }
}, {
  timestamps: true
});

// Index for better search performance
reportSchema.index({ user: 1, status: 1 });
reportSchema.index({ category: 1, severity: 1 });
reportSchema.index({ incidentDate: -1 });
reportSchema.index({ keywords: 'text', title: 'text', description: 'text' });

// Calculate priority score based on severity and urgency
reportSchema.pre('save', function(next) {
  const severityWeights = { low: 1, medium: 2, high: 3, critical: 4 };
  const urgencyWeights = { routine: 1, urgent: 2, emergency: 3 };
  
  const severityScore = severityWeights[this.severity] * 20;
  const urgencyScore = urgencyWeights[this.urgency] * 15;
  const timeScore = this.incidentDate ? Math.max(0, 15 - Math.floor((Date.now() - this.incidentDate.getTime()) / (1000 * 60 * 60 * 24))) : 0;
  
  this.priority_score = Math.min(100, severityScore + urgencyScore + timeScore);
  next();
});

// Extract keywords from title and description
reportSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isModified('description')) {
    const text = `${this.title} ${this.description}`.toLowerCase();
    const words = text.match(/\b\w+\b/g) || [];
    this.keywords = [...new Set(words.filter(word => word.length > 3))];
  }
  next();
});

module.exports = mongoose.model('Report', reportSchema);