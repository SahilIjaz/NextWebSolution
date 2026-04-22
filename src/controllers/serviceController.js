import pool from '../config/database.js';

export const getServices = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, title, description, icon_name, features, display_order, created_at
       FROM services
       ORDER BY display_order ASC`
    );

    const services = result.rows.map(service => ({
      ...service,
      features: service.features ? service.features.split(',').map(f => f.trim()) : []
    }));

    res.status(200).json({
      status: 200,
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to fetch services',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const getPricingPlans = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, plan_name, description, price_pkr, price_currency, plan_type, features, featured, display_order, created_at
       FROM pricing_plans
       ORDER BY display_order ASC`
    );

    const plans = result.rows.map(plan => ({
      ...plan,
      features: plan.features ? plan.features.split(',').map(f => f.trim()) : []
    }));

    res.status(200).json({
      status: 200,
      success: true,
      data: plans
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to fetch pricing plans',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const createService = async (req, res) => {
  try {
    const { title, description, iconName, features, displayOrder } = req.body;

    if (!title) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'title',
          message: 'Service title is required'
        }
      });
    }

    const featuresStr = Array.isArray(features) ? features.join(', ') : features || null;

    const result = await pool.query(
      `INSERT INTO services (title, description, icon_name, features, display_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, title, description, icon_name, features, display_order, created_at`,
      [title, description || null, iconName || null, featuresStr, displayOrder || 0]
    );

    const service = result.rows[0];
    service.features = service.features ? service.features.split(',').map(f => f.trim()) : [];

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to create service',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const createPricingPlan = async (req, res) => {
  try {
    const { planName, description, pricePkr, priceCurrency, planType, features, featured, displayOrder } = req.body;

    if (!planName) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'planName',
          message: 'Plan name is required'
        }
      });
    }

    const featuresStr = Array.isArray(features) ? features.join(', ') : features || null;

    const result = await pool.query(
      `INSERT INTO pricing_plans (plan_name, description, price_pkr, price_currency, plan_type, features, featured, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, plan_name, description, price_pkr, price_currency, plan_type, features, featured, display_order, created_at`,
      [planName, description || null, pricePkr || null, priceCurrency || 'PKR', planType || null, featuresStr, featured || false, displayOrder || 0]
    );

    const plan = result.rows[0];
    plan.features = plan.features ? plan.features.split(',').map(f => f.trim()) : [];

    res.status(201).json({
      status: 201,
      success: true,
      message: 'Pricing plan created successfully',
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to create pricing plan',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, iconName, features, displayOrder } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Service ID is required'
        }
      });
    }

    const featuresStr = Array.isArray(features) ? features.join(', ') : features;

    const result = await pool.query(
      `UPDATE services
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           icon_name = COALESCE($3, icon_name),
           features = COALESCE($4, features),
           display_order = COALESCE($5, display_order),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING id, title, description, icon_name, features, display_order, updated_at`,
      [title, description, iconName, featuresStr, displayOrder, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Service not found'
      });
    }

    const service = result.rows[0];
    service.features = service.features ? service.features.split(',').map(f => f.trim()) : [];

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to update service',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const updatePricingPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { planName, description, pricePkr, priceCurrency, planType, features, featured, displayOrder } = req.body;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Pricing plan ID is required'
        }
      });
    }

    const featuresStr = Array.isArray(features) ? features.join(', ') : features;

    const result = await pool.query(
      `UPDATE pricing_plans
       SET plan_name = COALESCE($1, plan_name),
           description = COALESCE($2, description),
           price_pkr = COALESCE($3, price_pkr),
           price_currency = COALESCE($4, price_currency),
           plan_type = COALESCE($5, plan_type),
           features = COALESCE($6, features),
           featured = COALESCE($7, featured),
           display_order = COALESCE($8, display_order),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING id, plan_name, description, price_pkr, price_currency, plan_type, features, featured, display_order, updated_at`,
      [planName, description, pricePkr, priceCurrency, planType, featuresStr, featured, displayOrder, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Pricing plan not found'
      });
    }

    const plan = result.rows[0];
    plan.features = plan.features ? plan.features.split(',').map(f => f.trim()) : [];

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Pricing plan updated successfully',
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to update pricing plan',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Service ID is required'
        }
      });
    }

    const result = await pool.query(
      'DELETE FROM services WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to delete service',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};

export const deletePricingPlan = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'Validation failed',
        error: {
          field: 'id',
          message: 'Pricing plan ID is required'
        }
      });
    }

    const result = await pool.query(
      'DELETE FROM pricing_plans WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Pricing plan not found'
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Pricing plan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to delete pricing plan',
      error: {
        type: error.name || 'ServerError',
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
};
