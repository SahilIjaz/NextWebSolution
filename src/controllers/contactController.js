import pool from '../config/database.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: !name ? 'name' : !email ? 'email' : !subject ? 'subject' : 'message',
          message: `${!name ? 'name' : !email ? 'email' : !subject ? 'subject' : 'message'} is required`
        }
      });
    }

    const result = await pool.query(
      `INSERT INTO contacts (name, email, phone, subject, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, created_at`,
      [name, email, phone, subject, message]
    );

    const contact = result.rows[0];

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to submit contact form',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const getContacts = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, subject, message, created_at FROM contacts ORDER BY created_at DESC'
    );

    res.status(200).json({
      status: 200,
      success: true,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to fetch contacts',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Contact ID is required'
        }
      });
    }

    const result = await pool.query(
      'SELECT * FROM contacts WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Contact not found',
        error: {
          field: 'id',
          message: `No contact found with ID "${id}"`
        }
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to fetch contact',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};
