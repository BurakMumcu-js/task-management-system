const mongoose = require('mongoose')
const express = require('express')
const app = express();
const {mainErrorHandler} = require('./src/middlewares/error.middleware')
const registerRoutes = require('./src/routes/register.router')
const loginRoutes = require('./src/routes/login.router');
const channelsRoutes = require('./src/routes/channels.router')
const tasksRoutes = require('./src/routes/tasks.router');
const passwordRoutes = require('./src/routes/password.router');
const config = require('./src/config');
const cors = require("cors");
const corsOptions = require("./src/config/cors");
require('dotenv').config({path: 'src/.env'});
app.use(express.json());
app.use('/password',passwordRoutes)
app.use('/channel',channelsRoutes);
app.use('/auth',registerRoutes)
app.use('/auth',loginRoutes);
app.use('/task',tasksRoutes);
app.use(mainErrorHandler)
config();
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