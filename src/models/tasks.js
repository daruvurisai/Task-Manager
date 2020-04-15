//Creating the required things
const mongoose = require ('mongoose')
const validator = require ('validator')
//Creating the tasks model in mongoose 
const task = mongoose.model('tasks',{
    TaskName:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }

})
module.exports = task