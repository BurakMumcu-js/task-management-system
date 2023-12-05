const request = require('supertest');
const app = require('../../app');
const { User } = require('../models/User.model');

describe('POST auth/register', () => {
    test('user can be register with any problem ', async () => {
        jest.spyOn(User, 'find').mockResolvedValue([]);

        const response = await request(app)
            .post('/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'Test123.',
            });

        expect(response.status).toBe(200);
    });

    test('user must already be registered', async () => {

        jest.spyOn(User, 'find').mockResolvedValue([{ _id: 'existingUserId', email: 'test@example.com' }]);

        const response = await request(app)
            .post('/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'Test123.',
            });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Kullanıcı zaten mevcut');
    });
});

