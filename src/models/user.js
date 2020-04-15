//Creating the required things
const mongoose = require ('mongoose')
const validator = require ('validator')

//Creating the user model in mongoose 
const users = mongoose.model('users',{
    name:{
        type:String,
        required:true, //Making it compulsary value
        trim:true   
    },
    age:{
        type:Number,
        validate(value){ //Validating 
            if(value<0){
                throw new Error('Age must be a positive error')
            }
        }
     },
     email:{
        type:String,
        required:true,
        validate(value){ //validating using the npm library validator
                if(!validator.isEmail(value)){
                   throw new Error('Enter your Email correctly') 
                }
        },
        trim:true,
        lowercase:true,
        default:0
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
               throw new Error('password showuld not contain more than 7 chars') 
            } 
        }

    }
}) 

module.exports=users