const mongoose = require('mongoose')
const {Schema} = mongoose

const BackEndMap = mongoose.model(
    'BackEndMap',
    new Schema({

        userId: {type:String, require:true},
        api: {type:Boolean, require:false},
        databases: {type:Boolean, require:false},
        tokens: {type:Boolean, require:false},
        protocols: {type:Boolean, require:false},
        git: {type:Boolean, require:false},
        cloudComputation: {type:Boolean, require:false},
        apiTest: {type:Boolean, require:false},
        unitTest: {type:Boolean, require:false}, 
        docker: {type:Boolean, require:false}, 
        complete:({type:Number})
        

    })
)

module.exports = BackEndMap