import Order from '../models/Order';
import { getIO } from '../socket/socket';

const statuses = ['Preparing', 'Out for Delivery', 'Delivered'];

// delay between each step (in milliseconds)
const STATUS_DELAY = 10000; // 10 seconds

export const simulateOrderStatus = (orderId: string) => {
  let index = 0;

  const run = async () => {
    if (index >= statuses.length) return;

    const status = statuses[index];

    try {
      await Order.findByIdAndUpdate(orderId, { status });

      getIO().emit('orderStatusUpdate', {
        orderId,
        status,
      });

      console.log(`Order ${orderId} → ${status}`);

      index++;

      setTimeout(run, STATUS_DELAY);
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  // start first update after delay
  setTimeout(run, STATUS_DELAY);
};
