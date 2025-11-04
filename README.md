# 🧪 Smart Web Form Tester

AI-powered web form with comprehensive automation testing suite.

## 🚀 Features

- ✅ AI-powered input validation (email, password, image)
- 📱 Fully responsive design with Tailwind CSS
- 🔒 Advanced password strength checking
- 📸 Image upload with validation
- 🤖 Automation testing with Playwright
- 🔄 Cross-browser testing (Chrome, Firefox, Safari)
- 📊 Detailed test reporting
- 🔥 CI/CD pipeline with GitHub Actions

## 📦 Installation
```bash
# Clone repository
git clone https://github.com/yourusername/smart-form-tester.git
cd smart-form-tester

# Install dependencies
npm install

# Create uploads directory
mkdir uploads
```

## 🏃 Running the Project

### Development Mode
```bash
# Run frontend and backend together
npm run dev:all

# Or run separately:
npm run dev      # Frontend (Vite)
npm run server   # Backend (Express)
```

### Production Build
```bash
npm run build
npm run preview
```

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### E2E Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific browser
npx playwright test --project=chromium
```

### Test Coverage
```bash
npm run test:coverage
```

## 📋 Test Scenarios Covered

1. **Form Validation**
   - Empty field validation
   - Email format validation
   - Password strength validation
   - Name format validation

2. **UI Interactions**
   - Checkbox preferences
   - Dropdown selection
   - File upload
   - Form submission

3. **Cross-Browser Testing**
   - Chrome
   - Firefox
   - Safari

4. **Responsive Design**
   - Mobile viewport
   - Tablet viewport
   - Desktop viewport

## 🔧 API Endpoints

### POST /api/submit-form
Submit form data with image

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Strong@123",
  "category": "developer",
  "preferences": ["Newsletter", "Product Updates"],
  "image": "file"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Pull Request Template

See [PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md)

## 🐛 Bug Reports

Please use the GitHub issue tracker to report bugs.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details