import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';
import { seedMenu } from './config/seedMenu';
import { initSocket } from './socket/socket';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect MongoDB
    await connectDB();

    // Seed menu (skip in test)
    if (process.env.NODE_ENV !== 'test') {
      await seedMenu();
    }

    // Start Express server
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Initialize Socket.io using Express server instance
    initSocket(server);
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();
