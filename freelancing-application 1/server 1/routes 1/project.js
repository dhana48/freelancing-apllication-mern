// server/models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
   title: { type: String, required: true },
   description: String,
   budget: Number,
   createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
