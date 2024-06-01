const mongoose = require('mongoose')
const {Schema} = mongoose

const FrontEndMap = mongoose.model(
    'FrontEndMap',
    new Schema({

        
        userId: {type:String, require:true},
        javascript: {type:Boolean, require:false},
        html: {type:Boolean, require:false},
        css: {type:Boolean, require:false},
        framework: {type:Boolean, require:false},
        git: {type:Boolean, require:false},
        apiIntegration: {type:Boolean, require:false},
        tokens: {type:Boolean, require:false},
        complete:({type:Number})
       
        

    })
)

module.exports = FrontEndMap