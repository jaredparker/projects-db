
const mongoose = require('mongoose');

const environments = ['static-web', 'nodejs-web'];

const baseOptions = {
    discriminatorKey: 'kind',
    _id: false
}

const baseEnvironmentSchema = new mongoose.Schema( {

    kind: {
        type: String,
        enum: environments,
        required: true
    }

}, baseOptions );

function addEnvironmentDiscriminators( schema, path ){

    for( let environment of environments ){
        schema.path(path).discriminator( environment, require(`./${environment}.js`) );
    }
}

module.exports = { environmentSchema: baseEnvironmentSchema, addEnvironmentDiscriminators };