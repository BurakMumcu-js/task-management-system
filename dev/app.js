const mongoose = require('mongoose')
const express = require('express')
const app = express();
const cors = require('cors')
const registerRoutes = require('./src/routes/register/register.router')
const loginRoutes = require('./src/routes/login/login.router');
const channelsRoutes = require('./src/routes/channels/channels.router')
const tasksRoutes = require('./src/routes/tasks/tasks.router');
const passwordRoutes = require('./src/routes/password/password.router');
app.use(cors());
app.use(express.json());
app.use('/password',passwordRoutes)
app.use('/channel',channelsRoutes);
app.use('/auth',registerRoutes)
app.use('/auth',loginRoutes);
app.use('/task',tasksRoutes);

const uri = "mongodb+srv://burakmumcu2534:1@task-management-databas.idwb5wa.mongodb.net/";
mongoose.connect(uri).then(res => {
    console.log('db connected')
})
    .catch(err => {
        console.log(err)
    })

const port = 5000
app.listen(5000, ()=>{
    console.log(`Uygulama http://localhost:${port} portunda ayakta`);
})