import pool from '../config/database.js';

// ═══════════════════════════════════════
// COMPANY VALUES
// ═══════════════════════════════════════

export const getValues = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, icon_name, description, display_order, created_at
       FROM company_values
       ORDER BY display_order ASC`
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
      message: 'Failed to fetch company values',
      error: { message: error.message }
    });
  }
};

export const createValue = async (req, res) => {
  try {
    const { title, iconName, description, displayOrder } = req.body;

    if (!title) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Title is required'
      });
    }

    const result = await pool.query(
      `INSERT INTO company_values (title, icon_name, description, display_order)
       VALUES ($1, $2, $3, $4)
       RETURNING id, title, icon_name, description, display_order, created_at`,
      [title, iconName || null, description || null, displayOrder || 0]
    );

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Value created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to create value',
      error: { message: error.message }
    });
  }
};

// ═══════════════════════════════════════
// TECH STACK
// ═══════════════════════════════════════

export const getTechStack = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, category, display_order, created_at
       FROM tech_stack
       ORDER BY display_order ASC`
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
      message: 'Failed to fetch tech stack',
      error: { message: error.message }
    });
  }
};

export const createTech = async (req, res) => {
  try {
    const { name, category, displayOrder } = req.body;

    if (!name) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Technology name is required'
      });
    }

    const result = await pool.query(
      `INSERT INTO tech_stack (name, category, display_order)
       VALUES ($1, $2, $3)
       RETURNING id, name, category, display_order, created_at`,
      [name, category || null, displayOrder || 0]
    );

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Technology added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to add technology',
      error: { message: error.message }
    });
  }
};

// ═══════════════════════════════════════
// CONTACT INFORMATION
// ═══════════════════════════════════════

export const getContactInfo = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, method_type, label, value, icon_name, display_order, created_at
       FROM contact_info
       ORDER BY display_order ASC`
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
      message: 'Failed to fetch contact information',
      error: { message: error.message }
    });
  }
};

export const createContactMethod = async (req, res) => {
  try {
    const { methodType, label, value, iconName, displayOrder } = req.body;

    if (!methodType || !label || !value) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Method type, label, and value are required'
      });
    }

    const result = await pool.query(
      `INSERT INTO contact_info (method_type, label, value, icon_name, display_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, method_type, label, value, icon_name, display_order, created_at`,
      [methodType, label, value, iconName || null, displayOrder || 0]
    );

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Contact method added successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to add contact method',
      error: { message: error.message }
    });
  }
};

export const deleteValue = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM company_values WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Value not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Value deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to delete value',
      error: { message: error.message }
    });
  }
};

export const deleteTech = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM tech_stack WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Technology not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Technology deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to delete technology',
      error: { message: error.message }
    });
  }
};

export const deleteContactMethod = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM contact_info WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Contact method not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Contact method deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to delete contact method',
      error: { message: error.message }
    });
  }
};
