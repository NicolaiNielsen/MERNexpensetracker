const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Expense = require('../models/expenseModel');

// Note: These tests assume MongoDB is running
// For a complete test setup, use MongoDB memory server or mock the database

describe('Expense Controller Tests', () => {
  
  beforeAll(async () => {
    // Connect to test database
    const mongoUri = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/expense-tracker-test';
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log('MongoDB connection for tests failed. Skipping integration tests.');
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    // Clean up database after each test
    await Expense.deleteMany({});
  });

  describe('GET /api/v2/expenses', () => {
    it('should return all expenses', async () => {
      // Create test data
      await Expense.create([
        { description: 'Coffee', amount: 5, category: 'Food' },
        { description: 'Gas', amount: 50, category: 'Transport' }
      ]);

      const response = await request(app).get('/api/v2/expenses');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data).toHaveLength(2);
    });

    it('should return empty array when no expenses exist', async () => {
      const response = await request(app).get('/api/v2/expenses');
      
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(0);
      expect(response.body.data).toEqual([]);
    });
  });

  describe('POST /api/v2/expenses', () => {
    it('should create a new expense', async () => {
      const newExpense = {
        description: 'Lunch',
        amount: 15,
        category: 'Food'
      };

      const response = await request(app)
        .post('/api/v2/expenses')
        .send(newExpense);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.description).toBe('Lunch');
      expect(response.body.data.amount).toBe(15);
      expect(response.body.data.category).toBe('Food');
    });

    it('should reject expense with missing required fields', async () => {
      const invalidExpense = {
        description: 'No amount'
        // missing amount and category
      };

      const response = await request(app)
        .post('/api/v2/expenses')
        .send(invalidExpense);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });

    it('should reject expense with invalid category', async () => {
      const invalidExpense = {
        description: 'Test',
        amount: 10,
        category: 'InvalidCategory'
      };

      const response = await request(app)
        .post('/api/v2/expenses')
        .send(invalidExpense);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v2/expenses/:id', () => {
    it('should update an existing expense', async () => {
      const expense = await Expense.create({
        description: 'Original',
        amount: 10,
        category: 'Food'
      });

      const updateData = {
        description: 'Updated',
        amount: 20,
        category: 'Transport'
      };

      const response = await request(app)
        .put(`/api/v2/expenses/${expense._id}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.description).toBe('Updated');
      expect(response.body.data.amount).toBe(20);
      expect(response.body.data.category).toBe('Transport');
    });

    it('should return 404 when updating non-existent expense', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .put(`/api/v2/expenses/${fakeId}`)
        .send({ description: 'Test' });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Not found');
    });
  });

  describe('DELETE /api/v2/expenses/:id', () => {
    it('should delete an existing expense', async () => {
      const expense = await Expense.create({
        description: 'To delete',
        amount: 5,
        category: 'Entertainment'
      });

      const response = await request(app).delete(`/api/v2/expenses/${expense._id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Deleted successfully');

      const deletedExpense = await Expense.findById(expense._id);
      expect(deletedExpense).toBeNull();
    });

    it('should return 404 when deleting non-existent expense', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app).delete(`/api/v2/expenses/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Not found');
    });
  });
});
