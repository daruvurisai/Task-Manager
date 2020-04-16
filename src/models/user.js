//Creating the required things
const mongoose = require ('mongoose')
const validator = require ('validator')
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
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
        unique:true,
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
        },

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
})
//Instance method for genetaring the tikens
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'thisismynewcourse')
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

//custom find by credentials functiomn //Model method
userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to Login')
    }
    const ismatch = await bcrypt.compare(password,user.password)
    if(!ismatch){
        throw new Error('Unable to login')
    }
   return user
}

//Creating the middleware up  using userschema 
//hashing the plain text password before saving
userSchema.pre('save',async function(next){
    const user = this
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,8)
        }
    next()
})

//Creating the user model in mongoose 
const User = mongoose.model('users',userSchema) 

module.exports=User