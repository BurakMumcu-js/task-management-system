import * as express from 'express';
import { Request, Response } from 'express';
import { register } from '../controllers/register.controller';
import { validateUser } from '../middlewares/validate.middleware';

const router = express.Router();

router.post('/register', validateUser, register);

export default router;
