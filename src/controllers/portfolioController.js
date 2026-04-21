import pool from '../config/database.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, image_url, technologies, live_link, github_link } = req.body;
    const userId = req.user.id;

    const result = await pool.query(
      `INSERT INTO projects (user_id, title, description, image_url, technologies, live_link, github_link)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, title, description, created_at`,
      [userId, title, description, image_url, technologies, live_link, github_link]
    );

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message
    });
  }
};

export const getProjects = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, description, image_url, technologies, live_link, github_link, created_at FROM projects ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects',
      error: error.message
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM projects WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project',
      error: error.message
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, image_url, technologies, live_link, github_link } = req.body;

    const result = await pool.query(
      `UPDATE projects SET title = $1, description = $2, image_url = $3, technologies = $4, live_link = $5, github_link = $6
       WHERE id = $7 AND user_id = $8
       RETURNING id, title, description, updated_at`,
      [title, description, image_url, technologies, live_link, github_link, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      'DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or unauthorized'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message
    });
  }
};
