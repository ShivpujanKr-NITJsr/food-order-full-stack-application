import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrder,
} from '../controllers/order.controller';

const router = express.Router();

// POST /api/v1/orders
router.post('/create', createOrder);

// GET /api/v1/orders
router.get('/', getAllOrders);

// GET /api/v1/orders/:id
router.get('/:id', getOrder);

export default router;
