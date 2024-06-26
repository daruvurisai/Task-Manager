const express = require ('express')
//Creating a new router
const router = new express.Router()
//loadin guser model
const User = require('../models/user')
//requiring the auth middleware
const auth  = require('../middleware/auth')
//Setting up get request ,we are using post for resource creation 
//Sign Up Route
router.post('/users',async (req,res)=>{
    //Creating instace for the user and makin it async
    const user = new User(req.body)
    try{
        //using await keyword 
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({user,token})
    } catch(e){
    res.status(400).send(e)
    }
 
})
//Creating Route for Logging in 
router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()//Generating user tokens 
        res.send({user,token})
    }catch(e){
        res.send(e)
    }
})
//Settign up route for logging out for particular session
router.post('/users/logout',auth,async(req,res)=>{
    try{
        //array filter method
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})
//Setting up route for logging out for all the sessions
router.post('/users/logoutall',auth,async (req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save()
        res.send()

    }catch(e){
        res.status(500).send()
    }
})

//Creating get method to fetch users for me only profile (many)
router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)
  /*  try{
    const users = await User.find({})
    res.send(users)
   }catch(e){
    res.status(500).send(e)
   } */
})
//Creating get method to fetch users by id and used async and await
router.get('/users/:id', async (req,res)=>{ //:id is the value which we have access dynamically 
    const _id = req.params.id
   
    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
  }catch(e){
        res.status(500).send(e)
    }
})

//Creating the end point for updateing the user end resource
router.patch('/users/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedupdates = ['name','email','password','age']
    const isvaluedOperation = updates.every((update)=>allowedupdates.includes(update))
    if(!isvaluedOperation){
        return res.status(400).send({error:'Inavalid Updates'})
    }
    try{
       // const user = await User.findByIdAndUpdate(req.params.id ,req.body,{new:true,runValidators:true})
       const user = await User.findById(req.params.id)
       updates.forEach((update)=>user[update]=req.body[update])
       await user.save()
       if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send()
    }
})

//Creating the end point for deleting the suer
router.delete('/users/:id',async (req,res)=>{
    const _id  = req.params.id
    try{
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send()
    }
})

module.exports = router