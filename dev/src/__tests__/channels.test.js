const request = require('supertest');
const mongoose = require('mongoose');
const net = require('net')
const app = require('../../app');

const testMongoUri = 'mongodb+srv://burakmumcu2534:1@task-management-databas.idwb5wa.mongodb.net/';

beforeAll(async () => {
    await mongoose.connect(testMongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('db connect');
});

afterAll(async () => {
    await mongoose.disconnect();
    const exit = net.connect(5000, () => {
        exit.end();
    })
    exit.on('end', () => {
        exit.end();
    })
});

describe('Channels API', () => {
    let testChannelId;

    test('should create a new channel', async () => {
        const response = await request(app)
            .post('/channel/create')
            .send({
                name: 'TestChannel',
                password: 'testPassword',
                creatorMail: 'test@example.com',
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('TestChannel isimli kanalınız başarıyla oluşmuştur');
        testChannelId = response.body.channel._id;
    });

    test('should add a user to the channel', async () => {
        const response = await request(app)
            .post('/channel/add')
            .send({
                emailAdded: 'yusuf.gurcan.21@gmail.com',
                channelName: 'TestChannel',
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Kullanıcı başarıyla eklendi');
    });

    test('should get all channels', async () => {
        const response = await request(app).get('/channel');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('should get a specific channel by ID', async () => {
        const response = await request(app).get(`/channel/${testChannelId}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('TestChannel');
    });

    test('should delete a channel', async () => {
        const response = await request(app)
            .post('/channel/delete')
            .send({
                channelName: 'TestChannel',
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('TestChannel isimli kanal başarıyla silindi');
    });
});
