import * as express from 'express';
import { Request, Response } from 'express';
import { deleteChannel, createChannel, addChannel, findChannels } from '../controllers/channels.controller';
import { validateChannel } from '../middlewares/validate.middleware';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';
const router = express.Router();

router.post('/delete',authorizationMiddleware(['admin']),deleteChannel);
router.post('/create',validateChannel,createChannel);
router.post('/add',authorizationMiddleware(['creator']), addChannel);
router.get('/',findChannels);

export default router;
