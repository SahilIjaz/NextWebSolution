import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import pool from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import companyRoutes from './routes/companyRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:5500",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5000",
      "http://127.0.0.1:5500",
      "http://127.0.0.1:8080",
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`\n🔵 ${req.method} ${req.path}`);
  console.log(`Origin: ${req.headers.origin || 'unknown'}`);
  console.log(`Content-Type: ${req.headers['content-type']}`);
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log(`Body size: ${JSON.stringify(req.body).length} bytes`);
  }
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/company', companyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Test database connection and start server
pool.query('SELECT NOW()', (err, result) => {
  if (err) {
    console.error('❌ Database Connection Failed:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Database Connected Successfully');
    console.log('📅 Server Time:', result.rows[0].now);

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
    });
  }
});
