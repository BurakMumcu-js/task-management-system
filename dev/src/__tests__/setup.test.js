const mongoose = require('mongoose');
const net = require('net');
const testMongoUri = process.env.MongoUri

const beforeTests = async () => {
    await mongoose.connect(testMongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log('db connect');
}

const afterTests = async () => {
    await mongoose.disconnect();
    const exit = net.connect(5000, () => {
        exit.end();
    })
    exit.on('end', () => {
        exit.end();
    })
}

module.exports = {
    afterTests,
    beforeTests,
}
