const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to check JWT
const protect = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Freelancer dashboard (get their applied projects)
router.get('/freelancer/dashboard', protect, async (req, res) => {
  if (req.user.role !== 'freelancer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const projects = await Project.find({ 'applications.freelancerId': req.user.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching freelancer dashboard data' });
  }
});

// Admin dashboard (view all projects and freelancers)
router.get('/admin/dashboard', protect, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const projects = await Project.find();
    const freelancers = await User.find({ role: 'freelancer' });

    res.json({ projects, freelancers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin dashboard data' });
  }
});

module.exports = router;
