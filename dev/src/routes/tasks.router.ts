import * as express from 'express';
import { Request, Response } from 'express';
import { addTask, doneTask } from '../controllers/tasks.controller';

const router = express.Router();

router.post('/add', addTask);
router.post('/done', doneTask);

export default router;
