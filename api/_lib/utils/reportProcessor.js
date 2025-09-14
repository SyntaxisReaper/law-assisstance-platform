// Report analysis and processing utilities

const emergencyKeywords = [
  'emergency', 'urgent', 'bleeding', 'unconscious', 'severe pain', 'critical', 
  'life threatening', 'assault', 'robbery', 'shooting', 'stabbing', 'overdose',
  'suicide', 'domestic violence', 'abuse', 'threatening', 'weapon', 'gun', 'knife'
];

const medicalKeywords = [
  'injured', 'hurt', 'pain', 'bleeding', 'broken', 'medical', 'hospital', 
  'ambulance', 'sick', 'unconscious', 'overdose', 'allergic reaction'
];

const mentalHealthKeywords = [
  'depressed', 'suicidal', 'mental health', 'anxiety', 'panic', 'psychologist',
  'therapy', 'emotional', 'stressed', 'counseling', 'trauma'
];

const policeKeywords = [
  'crime', 'theft', 'robbery', 'assault', 'harassment', 'stalking', 'vandalism',
  'break in', 'burglar', 'stolen', 'attacked', 'threatened', 'violence'
];

const legalKeywords = [
  'lawsuit', 'legal', 'court', 'lawyer', 'attorney', 'contract', 'dispute',
  'discrimination', 'harassment', 'rights', 'violation'
];

/**
 * Analyze report content and determine severity, urgency, and required services
 * @param {string} description - The report description
 * @param {string} category - The report category
 * @returns {object} Analysis results
 */
function analyzeReport(description, category) {
  const text = description.toLowerCase();
  const analysis = {
    severity: 'medium',
    urgency: 'routine',
    services_required: {
      police: false,
      medical: false,
      mental_health: false,
      legal: false,
      social_services: false
    },
    recommendations: []
  };

  // Check for emergency keywords
  const hasEmergencyKeywords = emergencyKeywords.some(keyword => 
    text.includes(keyword.toLowerCase())
  );

  // Determine severity and urgency based on category and keywords
  switch (category) {
    case 'medical_emergency':
      analysis.severity = 'critical';
      analysis.urgency = 'emergency';
      analysis.services_required.medical = true;
      analysis.recommendations.push('Immediate medical attention required');
      break;
      
    case 'assault':
    case 'domestic_violence':
      analysis.severity = hasEmergencyKeywords ? 'critical' : 'high';
      analysis.urgency = hasEmergencyKeywords ? 'emergency' : 'urgent';
      analysis.services_required.police = true;
      analysis.services_required.medical = medicalKeywords.some(k => text.includes(k));
      analysis.services_required.mental_health = true;
      analysis.recommendations.push('Contact police immediately');
      if (analysis.services_required.medical) {
        analysis.recommendations.push('Seek medical attention');
      }
      break;
      
    case 'theft':
    case 'fraud':
    case 'cybercrime':
      analysis.severity = 'medium';
      analysis.urgency = hasEmergencyKeywords ? 'urgent' : 'routine';
      analysis.services_required.police = true;
      analysis.services_required.legal = true;
      analysis.recommendations.push('File police report');
      analysis.recommendations.push('Consider legal consultation');
      break;
      
    case 'mental_health':
      analysis.severity = hasEmergencyKeywords ? 'critical' : 'high';
      analysis.urgency = hasEmergencyKeywords ? 'emergency' : 'urgent';
      analysis.services_required.mental_health = true;
      if (text.includes('suicide') || text.includes('self harm')) {
        analysis.urgency = 'emergency';
        analysis.severity = 'critical';
        analysis.recommendations.push('Crisis intervention needed immediately');
      }
      break;
      
    case 'harassment':
    case 'discrimination':
      analysis.severity = 'medium';
      analysis.urgency = 'routine';
      analysis.services_required.legal = true;
      analysis.services_required.mental_health = true;
      analysis.recommendations.push('Document all incidents');
      analysis.recommendations.push('Consider legal action');
      break;
      
    default:
      // Analyze content for keywords
      if (medicalKeywords.some(k => text.includes(k))) {
        analysis.services_required.medical = true;
        analysis.severity = 'high';
      }
      
      if (mentalHealthKeywords.some(k => text.includes(k))) {
        analysis.services_required.mental_health = true;
      }
      
      if (policeKeywords.some(k => text.includes(k))) {
        analysis.services_required.police = true;
        analysis.severity = 'high';
      }
      
      if (legalKeywords.some(k => text.includes(k))) {
        analysis.services_required.legal = true;
      }
  }

  // Override with emergency detection
  if (hasEmergencyKeywords) {
    analysis.urgency = 'emergency';
    if (analysis.severity === 'low' || analysis.severity === 'medium') {
      analysis.severity = 'high';
    }
  }

  // Add general recommendations based on services required
  if (analysis.services_required.police && !analysis.recommendations.includes('Contact police immediately')) {
    analysis.recommendations.push('File a police report');
  }
  
  if (analysis.services_required.medical && !analysis.recommendations.some(r => r.includes('medical'))) {
    analysis.recommendations.push('Consider medical evaluation');
  }
  
  if (analysis.services_required.mental_health && !analysis.recommendations.some(r => r.includes('mental') || r.includes('therapy'))) {
    analysis.recommendations.push('Mental health support may be beneficial');
  }
  
  if (analysis.services_required.legal && !analysis.recommendations.some(r => r.includes('legal'))) {
    analysis.recommendations.push('Legal consultation recommended');
  }

  return analysis;
}

/**
 * Determine which services are required based on report analysis
 * @param {object} report - The report object
 * @returns {array} Array of required service types
 */
function determineRequiredServices(report) {
  const services = [];
  
  if (report.services_required.police) services.push('police');
  if (report.services_required.medical) services.push('medical');
  if (report.services_required.mental_health) services.push('mental_health');
  if (report.services_required.legal) services.push('legal');
  if (report.services_required.social_services) services.push('social_services');
  
  return services;
}

/**
 * Calculate priority score for report processing queue
 * @param {object} report - The report object
 * @returns {number} Priority score (0-100)
 */
function calculatePriorityScore(report) {
  const severityWeights = { low: 1, medium: 2, high: 3, critical: 4 };
  const urgencyWeights = { routine: 1, urgent: 2, emergency: 3 };
  
  const severityScore = severityWeights[report.severity] * 20;
  const urgencyScore = urgencyWeights[report.urgency] * 15;
  
  // Time factor - more recent reports get higher priority
  const now = Date.now();
  const reportTime = new Date(report.incidentDate).getTime();
  const hoursSinceIncident = (now - reportTime) / (1000 * 60 * 60);
  const timeScore = Math.max(0, 20 - Math.floor(hoursSinceIncident / 24) * 2);
  
  // Service complexity factor
  const serviceCount = Object.values(report.services_required).filter(Boolean).length;
  const complexityScore = Math.min(15, serviceCount * 3);
  
  return Math.min(100, severityScore + urgencyScore + timeScore + complexityScore);
}

module.exports = {
  analyzeReport,
  determineRequiredServices,
  calculatePriorityScore
};