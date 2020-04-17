const express = require('express')
//makeing the mongoogse connect a require file
require('./db/mongoose')
//making the user a required 
const User = require('./models/user')
//making the task file requires
const Task = require('./models/tasks')
//Making the user router requires 
const userouter=require('./routers/user')
//Making thje task router required 
const taskrouter = require('./routers/task')
//Starting the express
const app = express()
//Port variable
const port = process.env.PORT||3000 


//By setting up below line It will automatically parse incomming json into to an object 
app.use(express.json())

app.use(userouter)//register with express application user router
app.use(taskrouter)//registering with the express application fo rthe task router


//Listening to the port
app.listen(port,()=>{
    console.log('Server is up on port ' +port)
})

const jwt = require('jsonwebtoken')
const myfunction = async()=>{
   const token = jwt.sign({_id:'abc123'},'thisismynewcourse',{expiresIn:'15 seconds'})
   console.log(token)

const veri = jwt.verify(token,'thisismynewcourse')
console.log(veri)
}
myfunction()