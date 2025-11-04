import React, { useState } from 'react';
import { Upload, Mail, Lock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const SmartFormTester = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    preferences: [],
    category: '',
    image: null
  });
  
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI-powered email validation
  // AI-powered email validation (FIXED)
const validateEmail = (email) => {
  // Basic email format check
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(email)) return false;
  
  // Check for suspicious patterns (but allow numbers!)
  const suspicious = email.includes('..') || email.includes('@@') || email.startsWith('.') || email.endsWith('.');
  
  return !suspicious;
};

  // Password strength checker
  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    return hasUpper && hasLower && hasNumber && hasSpecial && isLongEnough;
  };

  // Name validation
  const validateName = (name) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  };

  // Image validation (simulated AI check)
  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      return { valid: false, message: 'Only JPG, PNG, and WebP images are allowed' };
    }
    
    if (file.size > maxSize) {
      return { valid: false, message: 'Image must be less than 5MB' };
    }
    
    return { valid: true, message: 'Image is valid' };
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        preferences: checked 
          ? [...prev.preferences, value]
          : prev.preferences.filter(p => p !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateImage(file);
      
      if (!validation.valid) {
        setErrors(prev => ({ ...prev, image: validation.message }));
        setImagePreview(null);
        return;
      }
      
      setFormData(prev => ({ ...prev, image: file }));
      setErrors(prev => ({ ...prev, image: '' }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters and contain only letters';
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be 8+ characters with uppercase, lowercase, number, and special character';
    }
    
    if (formData.preferences.length === 0) {
      newErrors.preferences = 'Please select at least one preference';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.image) {
      newErrors.image = 'Please upload an image';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fix the errors before submitting' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Simulate API call
    setTimeout(() => {
      const formDataObj = {
        name: formData.name,
        email: formData.email,
        preferences: formData.preferences,
        category: formData.category,
        imageUploaded: formData.image ? formData.image.name : null,
        timestamp: new Date().toISOString()
      };
      
      console.log('Form submitted:', formDataObj);
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Form submitted successfully! Check console for details.' 
      });
      setIsSubmitting(false);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          password: '',
          preferences: [],
          category: '',
          image: null
        });
        setImagePreview(null);
        setSubmitStatus(null);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Smart Web Form Tester
            </h1>
            <p className="text-gray-600">
              AI-powered validation • Cross-browser testing ready
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" data-testid="main-form">
            {/* Name Field */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.name 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-200'
                }`}
                placeholder="John Doe"
                data-testid="name-input"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-200'
                }`}
                placeholder="john@example.com"
                data-testid="email-input"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.password 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-200'
                }`}
                placeholder="••••••••"
                data-testid="password-input"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.category 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-indigo-200'
                }`}
                data-testid="category-select"
              >
                <option value="">Select a category</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="tester">QA Tester</option>
                <option value="manager">Project Manager</option>
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* Preferences Checkboxes */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 block">
                Preferences
              </label>
              <div className="space-y-2">
                {['Newsletter', 'Product Updates', 'Beta Features', 'Community Events'].map((pref) => (
                  <label key={pref} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      value={pref}
                      checked={formData.preferences.includes(pref)}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                      data-testid={`preference-${pref.toLowerCase().replace(' ', '-')}`}
                    />
                    <span className="text-gray-700">{pref}</span>
                  </label>
                ))}
              </div>
              {errors.preferences && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  {errors.preferences}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                errors.image ? 'border-red-300' : 'border-gray-300 hover:border-indigo-400'
              }`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  data-testid="image-input"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                  ) : (
                    <div className="text-gray-500">
                      <Upload className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm">Click to upload image</p>
                      <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP (max 5MB)</p>
                    </div>
                  )}
                </label>
              </div>
              {errors.image && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  {errors.image}
                </p>
              )}
            </div>

            {/* Submit Status */}
            {submitStatus && (
              <div className={`p-4 rounded-lg flex items-center ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-red-50 text-red-800'
              }`}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="submit-button"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              🤖 Powered by AI validation • 🧪 Ready for automation testing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartFormTester;