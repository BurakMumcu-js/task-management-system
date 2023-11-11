const mongoose = require('mongoose')
const express = require('express')
const app = express();
const cors = require('cors')
const registerRoutes = require('./src/routes/register/register.router')
const loginRoutes = require('./src/routes/login/login.router');
app.use(cors());
app.use(express.json());
app.use('/auth',registerRoutes)
app.use('/auth',loginRoutes);

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