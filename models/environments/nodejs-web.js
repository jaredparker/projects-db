
const mongoose = require('mongoose');

const nodejsWebSchema = new mongoose.Schema({
    
    start: {
        type: String,
        default: 'npm run start'
    }

}, { _id: false });

module.exports = nodejsWebSchema;