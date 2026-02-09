import express from 'express';
import { createMenu, getMenu } from '../controllers/menu.controller';

const router = express.Router();
router.get('/', getMenu);
router.post('/', createMenu);

export default router;
