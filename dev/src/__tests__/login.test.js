const request = require('supertest');
const app = require('../../app');
const {User} = require("../models/User.model");

describe('POST auth/login', () => {
    test('user can be login with any problem ', async () => {
        jest.spyOn(User, 'find').mockResolvedValue([{email: 'Test@email.com', password: 'Test123.'}]);
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'Test@email.com',
                password: 'Test123.'
            })
        expect(response.status).toBe(200);
    })
    test('user information is incorrect ', async () => {
        jest.spyOn(User, 'find').mockResolvedValue([]);

        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'Test@email.com',
                password: 'Test123.'
            })

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('hatalı bilgi giriş');
    })
});