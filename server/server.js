import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import drawingsRouter from './routes/drawings.js';

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());  // Allow requests from React (localhost:5173)
app.use(express.json({ limit: '50mb' }));  // Parse JSON, allow large images

// Routes
app.use('/api/drawings', drawingsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
