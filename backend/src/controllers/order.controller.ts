import { Request, Response } from 'express';
import Order, { IOrder } from '../models/Order';
import { simulateOrderStatus } from '../services/orderStatus.service';
import { StatusCodes } from 'http-status-codes';
import MESSAGE from '../constants/message';

/**
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Public
 */
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { customerName, address, phone, items, total } = req.body;

    // Basic validation
    if (!customerName || !address || !phone || !items || items.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Missing required order fields',
      });
      return;
    }

    // Create order
    const order: IOrder = new Order({
      customerName,
      address,
      phone,
      items,
      total,
      status: 'Order Received',
    });

    const savedOrder = await order.save();

    if (process.env.NODE_ENV !== 'test') {
      // Start real-time order status simulation
      simulateOrderStatus(savedOrder._id.toString());
    }

    res.status(201).json({
      message: MESSAGE.post.succ,
      result: savedOrder,
    });
  } catch (error: any) {
    console.error('Create order error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single order by ID
 * @route   GET /api/orders/:id
 * @access  Public
 */
export const getOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.id;

    if (!orderId) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: MESSAGE.custom('Order ID is required'),
      });
      return;
    }

    const order = await Order.findById(orderId);

    if (!order) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: MESSAGE.custom('Order not found'),
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      message: MESSAGE.get.succ,
      result: order,
    });
  } catch (error: any) {
    console.error('Get order error:', error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: MESSAGE.get.fail,
      error: error.message,
    });
  }
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Public / Admin (future)
 */
export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({
      message: MESSAGE.get.succ,
      result: orders,
    });
  } catch (error: any) {
    console.error('Get all orders error:', error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: MESSAGE.get.fail,
      error: error.message,
    });
  }
};
