import * as express from 'express';
import { Request, Response } from 'express';
import { passwordChange, passwordChangeScreen, savePasswordScreen } from '../controllers/password.controller';

const router = express.Router();

router.post('/change', passwordChange);
router.get('/reset-password/:token', passwordChangeScreen);
router.post('/reset-password/:token', savePasswordScreen);

export default router;
