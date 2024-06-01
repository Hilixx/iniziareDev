const mongoose = require('mongoose')
const {Schema} = mongoose

const User = mongoose.model(
    'Users',
    new Schema({
        nome: {type:String, require:true},
        login: {type:String, require:true},
        password: {type:String, require:true},
        description:{type:String},
        region:{type:String},
        frontEndBadge:{type:Boolean},
        backEndBadge:{type:Boolean}
    })
)


module.exports = User