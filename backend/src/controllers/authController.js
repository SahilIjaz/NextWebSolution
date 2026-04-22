import bcrypt from 'bcryptjs';
import pool from '../config/database.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: !email ? 'email' : !password ? 'password' : 'name',
          message: `${!email ? 'email' : !password ? 'password' : 'name'} is required`
        }
      });
    }

    const userExists = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Registration failed',
        error: {
          field: 'email',
          message: `Email "${email}" is already registered. Please use a different email or try logging in.`
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email, name',
      [name, email, hashedPassword]
    );

    const user = result.rows[0];
    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({
      status: 201,
      success: true,
      message: 'User registered successfully',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Registration failed',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: !email ? 'email' : 'password',
          message: `${!email ? 'email' : 'password'} is required`
        }
      });
    }

    const result = await pool.query(
      'SELECT id, email, name, password FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'Authentication failed',
        error: {
          field: 'credentials',
          message: 'No account found with this email address'
        }
      });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        status: 401,
        success: false,
        message: 'Authentication failed',
        error: {
          field: 'password',
          message: 'Incorrect password. Please try again.'
        }
      });
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, name: user.name }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Login failed',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};
