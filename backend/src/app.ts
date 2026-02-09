import express from 'express';
import cors from 'cors';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/orders', orderRoutes);

export default app;
