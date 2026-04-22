import pool from '../config/database.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, image_url, technologies, live_link, github_link } = req.body;
    const userId = req.user.id;

    if (!title || !description) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: !title ? 'title' : 'description',
          message: `${!title ? 'title' : 'description'} is required`
        }
      });
    }

    const result = await pool.query(
      `INSERT INTO projects (user_id, title, description, image_url, technologies, live_link, github_link)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, title, description, created_at`,
      [userId, title, description, image_url, technologies, live_link, github_link]
    );

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Project created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to create project',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const { category, limit = 10, offset = 0 } = req.query;

    let query = 'SELECT id, title, description, category, thumbnail_url, image_url, technologies, live_link, tags, case_study_url, created_at FROM projects';
    let countQuery = 'SELECT COUNT(*) FROM projects';
    const params = [];
    let paramIndex = 1;

    if (category && category !== 'All') {
      query += ` WHERE category = $${paramIndex}`;
      countQuery += ` WHERE category = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    query += ' ORDER BY created_at DESC LIMIT $' + paramIndex + ' OFFSET $' + (paramIndex + 1);
    params.push(parseInt(limit), parseInt(offset));

    const [result, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, params.slice(0, paramIndex - 1))
    ]);

    res.status(200).json({
      status: 200,
      success: true,
      data: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < parseInt(countResult.rows[0].count)
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to fetch projects',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Project ID is required'
        }
      });
    }

    const result = await pool.query(
      'SELECT * FROM projects WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Project not found',
        error: {
          field: 'id',
          message: `No project found with ID "${id}"`
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
      message: 'Failed to fetch project',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, image_url, technologies, live_link, github_link } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Project ID is required'
        }
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: !title ? 'title' : 'description',
          message: `${!title ? 'title' : 'description'} is required`
        }
      });
    }

    const result = await pool.query(
      `UPDATE projects SET title = $1, description = $2, image_url = $3, technologies = $4, live_link = $5, github_link = $6
       WHERE id = $7 AND user_id = $8
       RETURNING id, title, description, updated_at`,
      [title, description, image_url, technologies, live_link, github_link, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({
        status: 403,
        success: false,
        message: 'Update failed',
        error: {
          field: 'authorization',
          message: 'Project not found or you do not have permission to update it'
        }
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Project updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to update project',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Project ID is required'
        }
      });
    }

    const result = await pool.query(
      'DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({
        status: 403,
        success: false,
        message: 'Delete failed',
        error: {
          field: 'authorization',
          message: 'Project not found or you do not have permission to delete it'
        }
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to delete project',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};
