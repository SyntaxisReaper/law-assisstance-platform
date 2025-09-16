// Mock auth service - bypasses network calls for demo purposes

const generateToken = () => {
  return 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9);
};

const generateUserId = () => {
  return 'user-' + Math.random().toString(36).substr(2, 9);
};

export const authService = {
  async login(email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful login
    const token = generateToken();
    const user = {
      id: generateUserId(),
      firstName: 'Demo',
      lastName: 'User',
      email: email,
      phone: '+1234567890',
      role: 'user'
    };
    
    // Store token
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      message: 'Login successful',
      token,
      user
    };
  },

  async register(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful registration
    const token = generateToken();
    const user = {
      id: generateUserId(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      role: 'user'
    };
    
    // Store token
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return {
      message: 'User registered successfully',
      token,
      user
    };
  },

  async getCurrentUser() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || !user.id) {
      throw new Error('No user found');
    }
    
    return { user };
  },

  async updateProfile(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = { ...currentUser, ...userData };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    return {
      message: 'Profile updated successfully',
      user: updatedUser
    };
  }
};

// Mock axios instance for compatibility
const mockApi = {
  get: () => Promise.resolve({ data: {} }),
  post: () => Promise.resolve({ data: {} }),
  put: () => Promise.resolve({ data: {} }),
  delete: () => Promise.resolve({ data: {} })
};

export default mockApi;
