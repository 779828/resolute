import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import studentRoutes from './routes/studentRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route (no DB needed)
app.get('/', (_req, res) => {
  res.json({ status: 'OK', message: 'Resolute Server is running' });
});

// Health check (no DB needed)
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Resolute Server is running' });
});

// DB connection middleware for API routes
let connectionPromise: Promise<typeof mongoose> | null = null;

const ensureDBConnected = async () => {
  if (mongoose.connection.readyState === 1) return;
  if (!connectionPromise) {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }
    connectionPromise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
  }
  await connectionPromise;
};

app.use('/api', async (req, res, next) => {
  try {
    await ensureDBConnected();
    next();
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message);
    connectionPromise = null;
    res.status(500).json({ success: false, message: 'Database connection failed', error: error.message });
  }
});

// Routes
app.use('/api', studentRoutes);

export default app;
