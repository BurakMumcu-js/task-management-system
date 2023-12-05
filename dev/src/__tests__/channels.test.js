const request = require('supertest');
const app = require('../../app');
const {Channel} = require('../models/channel.model')
const {User} = require('../models/user.model');
const {beforeTests,afterTests} = require('/setup.test');

beforeAll(async () =>{
    await beforeTests();
})

afterAll(async () => {
    await afterTests();
})

describe('POST channel/create ',()=>{

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
    test('should handle existing channel',async () => {

        // Kanalın var olduğunu simüle etmek için mock bir find fonksiyonu
        jest.spyOn(Channel, 'find').mockResolvedValue([{ name: 'ExistingChannel' }]);

        const response = await request(app)
            .post('/channel/create')
            .send({
                name: 'ExistingChannel',
                password: 'ExistingPassword',
                creatorMail: 'test@example.com',
            });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Böyle bir Kanal Bulunmaktadır');
    });
    })

describe('POST channel/add ',()=>{
    test('should add a user to the channel', async () => {
        const response = await request(app)
            .post('/channel/add')
            .send({
                emailAdded: 'Test@mail.com',
                channelName: 'TestChannel',
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Kullanıcı başarıyla eklendi');
    });

    test('should handle non-existing user',async ()=>{
        const mockChannel = new Channel();

        mockChannel.name = 'testChannel';
        mockChannel.users= []

        jest.spyOn(Channel, 'find').mockResolvedValue([mockChannel]);
        jest.spyOn(User, 'findOne').mockResolvedValue(null);

        const response = await request(app)
            .post('/channel/add')
            .send({
                emailAdded: 'Test@mail.com',
                channelName: 'TestChannel',
            });
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('böyle bir kullanıcı mevcut değil');
    })
    test('should handle existing user in the channel ',async () =>{
        const mockUser = new User({
            email:'existing@example.com'
        });

        let mockChannel = new Channel({
            name: 'TestChannel',
            users: [
                {
                    email: 'existing@example.com',
                    tasks: [],
                },
            ],
        });

        jest.spyOn(Channel, 'find').mockResolvedValue([mockChannel]);
        jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

        const response = await request(app)
            .post('/channel/add')
            .send({
                emailAdded: 'existing@example.com',
                channelName: 'TestChannel',
            });
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Kullanıcı zaten mevcut');
    })

})

describe('GET channel',()=>{
    test('should get all channels', async () => {
        const response = await request(app).get('/channel');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
})

describe('POST channel/delete', () => {
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