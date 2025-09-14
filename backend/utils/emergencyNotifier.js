// Emergency notification utilities

const ServiceProvider = require('../models/ServiceProvider');

/**
 * Notify emergency services based on report requirements
 * @param {object} report - The report object requiring emergency response
 */
async function notifyEmergencyServices(report) {
  const notifications = [];
  
  try {
    // Get user's location for finding nearest services
    const userLocation = report.location?.coordinates;
    
    // Find appropriate emergency services
    const emergencyServices = await findNearestEmergencyServices(
      report.services_required, 
      userLocation
    );
    
    // Send notifications to each required service
    for (const service of emergencyServices) {
      try {
        const notificationResult = await sendEmergencyNotification(report, service);
        notifications.push(notificationResult);
      } catch (error) {
        console.error(`Failed to notify ${service.name}:`, error);
        notifications.push({
          service: service.name,
          status: 'failed',
          error: error.message
        });
      }
    }
    
    // Log emergency notification
    console.log(`Emergency notifications sent for report ${report._id}:`, notifications);
    
  } catch (error) {
    console.error('Emergency notification error:', error);
    throw error;
  }
  
  return notifications;
}

/**
 * Find nearest emergency services based on requirements and location
 * @param {object} servicesRequired - Object indicating which services are needed
 * @param {array} userCoordinates - [longitude, latitude] of user location
 */
async function findNearestEmergencyServices(servicesRequired, userCoordinates) {
  const services = [];
  const maxDistance = 50; // 50 mile radius
  
  try {
    // Build service type filters
    const serviceTypes = [];
    if (servicesRequired.police) serviceTypes.push('police_station');
    if (servicesRequired.medical) serviceTypes.push('hospital');
    if (servicesRequired.mental_health) serviceTypes.push('mental_health_center');
    
    if (serviceTypes.length === 0) return services;
    
    // Query for emergency services
    const query = {
      type: { $in: serviceTypes },
      isActive: true,
      $or: [
        { isEmergency: true },
        { 'availability.emergency': true }
      ]
    };
    
    // Add location-based search if coordinates provided
    if (userCoordinates && userCoordinates.length === 2) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: userCoordinates
          },
          $maxDistance: maxDistance * 1609.34 // Convert miles to meters
        }
      };
    }
    
    const emergencyProviders = await ServiceProvider.find(query)
      .limit(10) // Limit to top 10 closest services
      .lean();
    
    services.push(...emergencyProviders);
    
  } catch (error) {
    console.error('Error finding emergency services:', error);
    
    // Fallback: get any available emergency services
    const fallbackServices = await ServiceProvider.find({
      type: { $in: ['police_station', 'hospital', 'mental_health_center'] },
      isActive: true
    }).limit(5).lean();
    
    services.push(...fallbackServices);
  }
  
  return services;
}

/**
 * Send emergency notification to a specific service provider
 * @param {object} report - The emergency report
 * @param {object} service - The service provider to notify
 */
async function sendEmergencyNotification(report, service) {
  const notification = {
    service: service.name,
    type: service.type,
    contact: service.contact.phone,
    status: 'pending'
  };
  
  try {
    // In a real implementation, you would integrate with:
    // - SMS service (Twilio)
    // - Email service 
    // - Emergency dispatch systems
    // - Phone call APIs
    
    // For MVP, we'll simulate the notification
    console.log(`🚨 EMERGENCY NOTIFICATION`);
    console.log(`Service: ${service.name} (${service.type})`);
    console.log(`Phone: ${service.contact.phone}`);
    console.log(`Report ID: ${report._id}`);
    console.log(`Severity: ${report.severity} | Urgency: ${report.urgency}`);
    console.log(`Location: ${report.location?.address || 'Not provided'}`);
    console.log(`Description: ${report.description.substring(0, 200)}...`);
    console.log(`User Contact: ${report.user?.phone || 'Not available'}`);
    console.log('---');
    
    // Simulate notification delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    notification.status = 'sent';
    notification.timestamp = new Date();
    notification.message = `Emergency report notification sent to ${service.name}`;
    
  } catch (error) {
    notification.status = 'failed';
    notification.error = error.message;
    throw error;
  }
  
  return notification;
}

/**
 * Send SMS notification (integration with Twilio)
 * @param {string} phoneNumber - Recipient phone number
 * @param {string} message - SMS message content
 */
async function sendSMS(phoneNumber, message) {
  // This would integrate with Twilio in production
  console.log(`SMS to ${phoneNumber}: ${message}`);
  return { status: 'sent', method: 'sms' };
}

/**
 * Send email notification
 * @param {string} email - Recipient email
 * @param {string} subject - Email subject
 * @param {string} message - Email content
 */
async function sendEmail(email, subject, message) {
  // This would integrate with email service in production
  console.log(`Email to ${email}: ${subject}`);
  return { status: 'sent', method: 'email' };
}

/**
 * Format emergency message for notifications
 * @param {object} report - The emergency report
 * @returns {string} Formatted message
 */
function formatEmergencyMessage(report) {
  return `
EMERGENCY REPORT ALERT

Report ID: ${report._id}
Severity: ${report.severity.toUpperCase()}
Category: ${report.category.replace('_', ' ').toUpperCase()}

Incident: ${report.title}
Location: ${report.location?.address || 'Location not provided'}
Time: ${new Date(report.incidentDate).toLocaleString()}

Description: ${report.description}

Contact: ${report.user?.phone || 'Phone not available'}

This is an automated emergency notification from the Law Assistance Platform.
`.trim();
}

module.exports = {
  notifyEmergencyServices,
  findNearestEmergencyServices,
  sendEmergencyNotification,
  sendSMS,
  sendEmail,
  formatEmergencyMessage
};