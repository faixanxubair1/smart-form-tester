import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_BASE_URL = 'http://localhost:3001/api';

// Helper to create a simple test image buffer
function createTestImageBuffer() {
  return Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
    0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
    0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
    0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x63, 0xF8, 0x0F, 0x00, 0x00,
    0x01, 0x01, 0x00, 0x00, 0x18, 0xDD, 0x8D, 0xB4
  ]);
}

describe('API Integration Tests', () => {
  describe('GET /api/health', () => {
    it('should return health check status', async () => {
      const response = await fetch(`${API_BASE_URL}/health`);

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.status).toBe('OK');
      expect(data.timestamp).toBeDefined();
    });
  });

  describe('POST /api/submit-form', () => {
    it('should successfully submit valid form data with image', async () => {
      const form = new FormData();
      form.append('name', 'John Doe');
      form.append('email', 'john@example.com');
      form.append('password', 'Strong@123');
      form.append('category', 'developer');
      form.append('preferences', JSON.stringify(['Newsletter']));
      form.append('image', Buffer.from(createTestImageBuffer()), 'test.png');

      const response = await fetch(`${API_BASE_URL}/submit-form`, {
        method: 'POST',
        body: form,
        headers: form.getHeaders()
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('John Doe');
      expect(data.data.email).toBe('john@example.com');
      expect(data.data.category).toBe('developer');
    });

    it('should reject submission with missing required fields', async () => {
      const form = new FormData();
      form.append('name', 'John Doe');
      // Missing email, password, category

      const response = await fetch(`${API_BASE_URL}/submit-form`, {
        method: 'POST',
        body: form,
        headers: form.getHeaders()
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.success).toBe(false);
      expect(data.message).toContain('Missing required fields');
    });

    it('should reject invalid email format', async () => {
      const form = new FormData();
      form.append('name', 'John Doe');
      form.append('email', 'invalid-email');
      form.append('password', 'Strong@123');
      form.append('category', 'developer');

      const response = await fetch(`${API_BASE_URL}/submit-form`, {
        method: 'POST',
        body: form,
        headers: form.getHeaders()
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.message).toContain('email');
    });

    it('should reject weak password', async () => {
      const form = new FormData();
      form.append('name', 'John Doe');
      form.append('email', 'john@example.com');
      form.append('password', 'weak');
      form.append('category', 'developer');

      const response = await fetch(`${API_BASE_URL}/submit-form`, {
        method: 'POST',
        body: form,
        headers: form.getHeaders()
      });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.message).toContain('Password');
    });

    it('should accept form without image', async () => {
      const form = new FormData();
      form.append('name', 'Jane Smith');
      form.append('email', 'jane@example.com');
      form.append('password', 'Strong@456');
      form.append('category', 'designer');
      form.append('preferences', JSON.stringify(['Product Updates']));

      const response = await fetch(`${API_BASE_URL}/submit-form`, {
        method: 'POST',
        body: form,
        headers: form.getHeaders()
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.data.name).toBe('Jane Smith');
    });
  });
});