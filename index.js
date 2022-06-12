
const { connect } = require('mongoose');

const Project = require('./models/project.js');

module.exports = {

    models: {
        Project
    },

    connect
}