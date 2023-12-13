const mongoose = require('mongoose')
const express = require('express')
const app = express();
const http = require('http');
const cors = require('cors')
const {mainErrorHandler} = require('./src/middlewares/error.middleware')
const registerRoutes = require('./src/routes/register/register.router')
const loginRoutes = require('./src/routes/login/login.router');
const channelsRoutes = require('./src/routes/channels/channels.router')
const tasksRoutes = require('./src/routes/tasks/tasks.router');
const passwordRoutes = require('./src/routes/password/password.router');
require('dotenv').config({path: 'src/.env'});
app.use(cors());
app.use(express.json());
app.use('/password',passwordRoutes)
app.use('/channel',channelsRoutes);
app.use('/auth',registerRoutes)
app.use('/auth',loginRoutes);
app.use('/task',tasksRoutes);

app.use(mainErrorHandler)

const uri = process.env.MongoUri;
mongoose.connect(uri).then(res => {
    console.log('db connected')
})
    .catch(err => {
        console.log(err)
    })

const port = process.env.PORT || 1903

const server = app.listen(port,() => {
    console.log(`Port ${port} dinleme modunda...`);
})

module.exports = server