// Language support for Indian Law Assistance Platform
// Future implementation for Hindi and regional languages

export const SUPPORTED_LANGUAGES = {
  ENGLISH: 'en',
  HINDI: 'hi',
  // Future additions: Tamil, Bengali, etc.
};

export const EMERGENCY_TEXTS = {
  [SUPPORTED_LANGUAGES.ENGLISH]: {
    police: 'Call Police (100)',
    ambulance: 'Call Ambulance (102)',
    emergency: 'Call Emergency (112)',
    women_helpline: 'Women Helpline (181)',
  },
  [SUPPORTED_LANGUAGES.HINDI]: {
    police: 'पुलिस को फोन करें (100)',
    ambulance: 'एम्बुलेंस को फोन करें (102)', 
    emergency: 'आपातकाल (112)',
    women_helpline: 'महिला हेल्पलाइन (181)',
  }
};

export const COMMON_PHRASES = {
  [SUPPORTED_LANGUAGES.ENGLISH]: {
    help: 'Help',
    emergency: 'Emergency',
    report_incident: 'Report Incident',
    get_help: 'Get Help',
    legal_aid: 'Legal Aid',
    women_safety: 'Women Safety',
  },
  [SUPPORTED_LANGUAGES.HINDI]: {
    help: 'मदद',
    emergency: 'आपातकाल',
    report_incident: 'घटना की रिपोर्ट करें',
    get_help: 'सहायता प्राप्त करें',
    legal_aid: 'कानूनी सहायता',
    women_safety: 'महिला सुरक्षा',
  }
};

// Default language
export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.ENGLISH;

// Function to get text in current language (to be implemented)
export const getText = (key, language = DEFAULT_LANGUAGE) => {
  // Implementation for getting localized text
  return key; // Placeholder
};