// server/routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/project'); // Import the Project model

// Get all projects
router.get('/', async (req, res) => {
   try {
      const projects = await Project.find(); // Retrieve all projects from the database
      res.json(projects); // Send projects as JSON
   } catch (err) {
      res.status(500).json({ message: err.message }); // Handle errors
   }
});

// Create a new project
router.post('/', async (req, res) => {
   const project = new Project({
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
   });

   try {
      const newProject = await project.save(); // Save new project to database
      res.status(201).json(newProject); // Respond with the new project data
   } catch (err) {
      res.status(400).json({ message: err.message }); // Handle errors
   }
});

module.exports = router;
