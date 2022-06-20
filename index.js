
const { connect } = require('mongoose');
const { compare } = require('bcrypt');

const Project = require('./models/project.js');

module.exports = {

    models: {
        Project
    },

    connect,
    comparePasswords: compare
}