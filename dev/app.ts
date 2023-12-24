import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { mainErrorHandler } from './src/middlewares/error.middleware';
import registerRoutes from './src/routes/register.router';
import loginRoutes from './src/routes/login.router';
import channelsRoutes from './src/routes/channels.router';
import tasksRoutes from './src/routes/tasks.router';
import passwordRoutes from './src/routes/password.router';
//import config from './src/config';
import corsOptions from './src/config/cors';
import dotenv from 'dotenv';
import {authenticateMiddleware} from './src/middlewares/authenticate.middleware'
dotenv.config({ path: 'src/.env' });

const app = express();
const uri = process.env.MongoUri as string;

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(uri).then(() => {
  console.log('db connected');
}).catch(err => {
  console.log(err);
});

app.use(authenticateMiddleware);
app.use('/password', passwordRoutes);
app.use('/channel', channelsRoutes);
app.use('/auth', registerRoutes);
app.use('/auth', loginRoutes);
app.use('/task', tasksRoutes);
app.use(mainErrorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Port ${port} dinleme modunda...`);
});

export default server;
