
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    // schema

});

const Project = mongoose.model( 'Project', projectSchema );

module.exports = Project;