import pool from '../config/database.js';

export const getTestimonials = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, role, message, rating, avatar_initials, avatar_color, created_at
       FROM testimonials
       ORDER BY created_at DESC`
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
      message: 'Failed to fetch testimonials',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { name, role, message, rating, avatarInitials, avatarColor } = req.body;

    if (!name || !role || !message || !rating) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: !name ? 'name' : !role ? 'role' : !message ? 'message' : 'rating',
          message: `${!name ? 'name' : !role ? 'role' : !message ? 'message' : 'rating'} is required`
        }
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'rating',
          message: 'Rating must be between 1 and 5'
        }
      });
    }

    const result = await pool.query(
      `INSERT INTO testimonials (name, role, message, rating, avatar_initials, avatar_color)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, role, message, rating, avatar_initials, avatar_color, created_at`,
      [name, role, message, rating, avatarInitials || null, avatarColor || null]
    );

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Testimonial created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to create testimonial',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Testimonial ID is required'
        }
      });
    }

    const result = await pool.query(
      'SELECT * FROM testimonials WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Testimonial not found'
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
      message: 'Failed to fetch testimonial',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, message, rating, avatarInitials, avatarColor } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Testimonial ID is required'
        }
      });
    }

    const result = await pool.query(
      `UPDATE testimonials
       SET name = COALESCE($1, name),
           role = COALESCE($2, role),
           message = COALESCE($3, message),
           rating = COALESCE($4, rating),
           avatar_initials = COALESCE($5, avatar_initials),
           avatar_color = COALESCE($6, avatar_color),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING id, name, role, message, rating, avatar_initials, avatar_color, updated_at`,
      [name, role, message, rating, avatarInitials, avatarColor, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Testimonial updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to update testimonial',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Testimonial ID is required'
        }
      });
    }

    const result = await pool.query(
      'DELETE FROM testimonials WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Testimonial not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to delete testimonial',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};
