const request = require('supertest');
const app = require('../../app');
const {User} = require("../models/user.model");
const {Channel} = require("../models/channel.model");

describe('POST task/add', () => {
    test('The task should be added successfully', async () => {
        jest.spyOn(User, 'find').mockResolvedValue([{email: 'Test@email.com', password: 'Test123.'}]);
        jest.spyOn(Channel, 'find').mockResolvedValue([{name: 'TestKanal'}]);
        const response = await request(app)
            .post('/task/add')
            .send({
                title: 'testTitle',
                content: 'testContent',
                user: {
                    _id: "d426bc6a-8ce2-451a-2d17-fsf3cc021f97",
                    name: "Test",
                    email: "Test@email.com",
                    password: "Test123.",
                    isAdmin: false,
                    __v: 0,
                    resetPasswordExpires: '2023 - 11 - 19T13: 41: 03.981 + 00:00',
                    resetPasswordToken: "2dc65891ecc255845b5180aa0c890c687bd8fa68"
                },
                channel: 'TestKanal',
                deadline: '',
            })
        expect(response.status).toBe(200);
    })
    test('the channel can not be found',async () =>{
        jest.spyOn(User, 'find').mockResolvedValue([{email: 'Test@email.com', password: 'Test123.'}]);
        const response = await request(app)
            .post('/task/add')
            .send({
                title: 'testTitle',
                content: 'testContent',
                user: {
                    _id: "d426bc6a-8ce2-451a-2d17-fsf3cc021f97",
                    name: "Test",
                    email: "Test@email.com",
                    password: "Test123.",
                    isAdmin: false,
                    __v: 0,
                    resetPasswordExpires: '2023 - 11 - 19T13: 41: 03.981 + 00:00',
                    resetPasswordToken: "2dc65891ecc255845b5180aa0c890c687bd8fa68"
                },
                channel: 'TestKanal',
                deadline: '',
            })
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Kanal bulunamadı');
    })
});

describe('POST task/done', () => {
    test('task must be done with success',async () => {
        jest.spyOn(Channel, 'find').mockResolvedValue([{ name: 'ExistingChannel',users:[{name:'testUser',tasks:[{title:'testTask',content:"content"}]}] }]);
        const response = request(app)
            .post('task/done')
            .send({
                index:0,
                userName: 'testUser',
                channelName:'existingChannel'
            })
        expect(response.status).toBe(200);
    })
});