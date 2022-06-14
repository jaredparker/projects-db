
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const urlSlug  = require('url-slug');

const { visibilities, storage_hosts } = require('../lib/enums.js');

const { environmentSchema, addEnvironmentDiscriminators } = require('./environments/index.js');

const projectSchema = new mongoose.Schema({

    // Used to access project (e.g my-first-project)
    id: {
        type: String,
        unique: true,
        lowercase: true
    },

    // # Viewing Details (used to show content to the user) #

    name: {
        type: String,
        default: 'New Project',
        required: true
    },

    description: {
        type: String
    },

    tags: [{
        type: String
    }],

    // If project is listed, accessed via link only, or not shown
    visibility: {
        type: String,
        enum: [visibilities],
        default: visibilities.UNLISTED,
        required: true
    },

    // If password is supplied, it is required to access the app
    password: {
        type: String
    },

    // # Hosting Details #

    src: {

        host: {
            type: String,
            enum: [storage_hosts],
            default: storage_hosts.GITHUB,
            required: true
        },

        loc: {
            type: String,
            required: true
        }
    },

    environment: {
        type: environmentSchema,
        default: {
            kind: 'static-web'
        },
        required: true
    },

    timeouts: {

        // How long app kept running after inactivity
        shutdown: {
            type: Number,
            default: 60000, // 1 Minute (-1 = always running)
            required: true
        },

        // How long app is stored after being shutdown
        cache: {
            type: Number,
            default: 900000, // 15 Minute (-1 = always stored)
            required: true
        }
    }

});

addEnvironmentDiscriminators( projectSchema, 'environment' );

// Generate ID if not provided
projectSchema.pre('save', async function( next ){
    if( !this.isNew || this.isModified('id') ){ return next(); }

    // Create new ID based on name
    const slug = urlSlug( this.name );

    if( await Project.exists({ id: slug }) ){
        next( new Error(`Couldn't generate a unique ID. ('${slug}' already exists)`) );
    };

    this.id = slug;
    next();
});

// Encrypt password
projectSchema.pre('save', async function( next ){
    if( !this.password || !this.isModified('password') ){ return next(); }
  
    this.password = await bcrypt.hash( this.password, 10 );
    next();
});

const Project = mongoose.model( 'Project', projectSchema );

module.exports = Project;