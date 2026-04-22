import pool from '../config/database.js';

export const getTeamMembers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, role, bio, avatar_initials, avatar_color, email, created_at
       FROM team_members
       ORDER BY created_at ASC`
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
      message: 'Failed to fetch team members',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const { name, role, bio, avatarInitials, avatarColor, email } = req.body;

    if (!name || !role) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: !name ? 'name' : 'role',
          message: `${!name ? 'name' : 'role'} is required`
        }
      });
    }

    const result = await pool.query(
      `INSERT INTO team_members (name, role, bio, avatar_initials, avatar_color, email)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, role, bio, avatar_initials, avatar_color, email, created_at`,
      [name, role, bio || null, avatarInitials || null, avatarColor || null, email || null]
    );

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Team member created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to create team member',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Team member ID is required'
        }
      });
    }

    const result = await pool.query(
      'SELECT * FROM team_members WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Team member not found'
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
      message: 'Failed to fetch team member',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, bio, avatarInitials, avatarColor, email } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Team member ID is required'
        }
      });
    }

    const result = await pool.query(
      `UPDATE team_members
       SET name = COALESCE($1, name),
           role = COALESCE($2, role),
           bio = COALESCE($3, bio),
           avatar_initials = COALESCE($4, avatar_initials),
           avatar_color = COALESCE($5, avatar_color),
           email = COALESCE($6, email),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING id, name, role, bio, avatar_initials, avatar_color, email, updated_at`,
      [name, role, bio, avatarInitials, avatarColor, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Team member updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to update team member',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Team member ID is required'
        }
      });
    }

    const result = await pool.query(
      'DELETE FROM team_members WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Team member not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to delete team member',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};
