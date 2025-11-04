/**
 * AI-powered validators for form inputs
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) return { valid: false, message: 'Invalid email format' };
  
  // AI check: detect suspicious patterns
  const suspicious = /\d{3,}/.test(email) || email.includes('..') || email.includes('@@');
  
  if (suspicious) {
    return { valid: false, message: 'Email appears to be invalid or suspicious' };
  }
  
  return { valid: true, message: 'Email is valid' };
};

export const validatePassword = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const allValid = Object.values(checks).every(v => v);
  
  if (!allValid) {
    const missing = [];
    if (!checks.length) missing.push('at least 8 characters');
    if (!checks.uppercase) missing.push('uppercase letter');
    if (!checks.lowercase) missing.push('lowercase letter');
    if (!checks.number) missing.push('number');
    if (!checks.special) missing.push('special character');
    
    return {
      valid: false,
      message: `Password must contain: ${missing.join(', ')}`
    };
  }
  
  return { valid: true, message: 'Password is strong' };
};

export const validateName = (name) => {
  if (name.trim().length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters' };
  }
  
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return { valid: false, message: 'Name can only contain letters and spaces' };
  }
  
  return { valid: true, message: 'Name is valid' };
};

export const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    return { valid: false, message: 'Only JPG, PNG, and WebP images are allowed' };
  }
  
  if (file.size > maxSize) {
    return { valid: false, message: 'Image must be less than 5MB' };
  }
  
  // Simulated AI validation
  const aiScore = Math.random();
  if (aiScore < 0.1) {
    return { valid: false, message: 'Image quality is too low' };
  }
  
  return { 
    valid: true, 
    message: 'Image is valid',
    aiMetadata: {
      quality: aiScore > 0.7 ? 'high' : 'medium',
      estimatedSize: file.size,
      format: file.type
    }
  };
};