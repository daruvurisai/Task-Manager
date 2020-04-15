require('../src/db/mongoose')
const Task = require('../src/models/tasks')

/* Task.findByIdAndDelete('5e93f4db7f6ef12f946eaad7').then((task)=>{
    
    return Task.countDocuments({completed:true})
}).then((result)=>{
    console.log('Result of completed tasks = '+result)
}).catch((e)=>{
    consolelog(e)
})
 */
//creatin deletetask function using async and await 

const deletetaskandcount = async(id)=>{
const task = await Task.findByIdAndDelete(id)
const count = await Task.countDocuments({completed:true})
return count
}

deletetaskandcount('5e93f746cd695246cccbf035').then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log('Error')
})

