import pool from '../config/database.js';

export const submitContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, service, budget, message, agreeToTerms } = req.body;

    if (!firstName || !lastName || !email || !service || !message) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: !firstName ? 'firstName' : !lastName ? 'lastName' : !email ? 'email' : !service ? 'service' : 'message',
          message: `${!firstName ? 'firstName' : !lastName ? 'lastName' : !email ? 'email' : !service ? 'service' : 'message'} is required`
        }
      });
    }

    if (!agreeToTerms) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'agreeToTerms',
          message: 'You must agree to the Privacy Policy and Terms of Service'
        }
      });
    }

    const result = await pool.query(
      `INSERT INTO contacts (first_name, last_name, email, phone, service, budget, message, agree_to_terms, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'new')
       RETURNING id, first_name, last_name, email, service, created_at`,
      [firstName, lastName, email, phone || null, service, budget || null, message, agreeToTerms]
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
      `SELECT id, name, email, phone, message, subject, created_at
       FROM contacts ORDER BY created_at DESC`
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

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: !id ? 'id' : 'status',
          message: `${!id ? 'id' : 'status'} is required`
        }
      });
    }

    const validStatuses = ['new', 'read', 'responded', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'status',
          message: `Status must be one of: ${validStatuses.join(', ')}`
        }
      });
    }

    const result = await pool.query(
      'UPDATE contacts SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, status, updated_at',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Contact status updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to update contact status',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};
