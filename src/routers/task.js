//making the express required
const express = require('express')
//creating the new router 
const router = new express.Router()
//making the task model required
const Task = require('../models/tasks')


//Creating the task end  point
router.post('/tasks',async (req,res)=>{
    //cretaing the instance of the task 
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status.send(e)
    }
})
//Creating end point  to fetch all the tasks using get method and async and await
 router.get('/tasks',async (req,res)=>{
    try{
        const task = await Task.find({})
        res.send(task)
    }catch(e){
        res.send(e)
    }
   
 })
 //Creating end point to fetch the task by id
 router.get('/tasks/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
  }catch(e){
        res.status(500).send(e)
    }
 })

//creatingth end point for updating the task by id
router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedupdates = ['TaskName','completed']
    const isvaluedOperation = updates.every((update)=>allowedupdates.includes(update))
    if(!isvaluedOperation){
        return res.status(400).send({error:'Inavalid Updates'})
    }
    try{  
           const task = await Task.findById(req.params.id) //passing the id
           updates.forEach((update)=>task[update]= req.body[update])
           await task.save()
            if(!task){
                return res.status(404).send()
            }
            res.send(task)
    }catch(e){
            res.status(400).send(e)
    }
})

//Creating the end point for deleting the task by id

//Creating the end point for deleting the suer
router.delete('/tasks/:id',async (req,res)=>{
    const _id  = req.params.id
    try{
        const task = await Task.findByIdAndDelete(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router

