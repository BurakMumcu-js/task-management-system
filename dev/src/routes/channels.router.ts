import * as express from 'express';
import { Request, Response } from 'express';
import { deleteChannel, createChannel, addChannel, findChannels } from '../controllers/channels.controller';
import { validateChannel } from '../middlewares/validate.middleware';
import { authorizationMiddleware } from '../middlewares/authorization.middleware';
const router = express.Router();

router.post('/delete',authorizationMiddleware,deleteChannel);
router.post('/create',validateChannel,createChannel);
router.post('/add', addChannel);
router.get('/',findChannels);

export default router;
