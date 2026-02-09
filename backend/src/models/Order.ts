import mongoose, { Document, Schema } from 'mongoose';

export interface IOrderItem {
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  customerName: string;
  address: string;
  phone: string;
  items: IOrderItem[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    customerName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    // FIXED ITEMS ARRAY TYPE
    items: {
      type: [OrderItemSchema],
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: 'Order Received',
      enum: ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
