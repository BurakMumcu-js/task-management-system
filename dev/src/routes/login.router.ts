import * as express from 'express';
import { Request, Response } from 'express';
import { login } from '../controllers/login.controller';

const router = express.Router();

router.post('/login', login);

export default router;
