
const mongoose = require('mongoose');

const staticWebSchema = new mongoose.Schema({

    public: {
        type: [String],
        default: ['/']
    }

}, { _id: false });

module.exports = staticWebSchema;