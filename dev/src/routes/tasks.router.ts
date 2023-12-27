import * as express from 'express';
import { Request, Response } from 'express';
import { addTask, doneTask } from '../controllers/tasks.controller';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';

const router = express.Router();

router.post('/add',/*authorizationMiddleware(['creator']),*/addTask);
router.post('/done', doneTask);

export default router;
