import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import Order from '../src/models/Order';
import MESSAGE from '../src/constants/message';

describe('Order API', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/food-order-test');
  });

  afterEach(async () => {
    await Order.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('creates order successfully', async () => {
    const orderData = {
      customerName: 'Test',

      address: 'Test Address',

      phone: '9999999999',

      items: [
        {
          name: 'Pizza',
          price: 200,
          quantity: 1,
        },
      ],

      total: 200,
    };

    const res = await request(app)
      .post('/api/v1/orders/create')
      .send(orderData);

    expect(res.statusCode).toBe(201);

    expect(res.body.message).toBe(MESSAGE.post.succ);

    expect(res.body.result).toBeDefined();

    const order = await Order.findById(res.body.result._id);

    expect(order).not.toBeNull();
  });
});
