require('../src/db/mongoose')
const User = require('../src/models/user')

//5e93ed6300eb9114b4703912
/* 
User.findByIdAndUpdate('5e93ed6300eb9114b4703912',{
    age:24
}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:25})
}).then((resule)=>{
    console.log(resule)
}).catch((e)=>{
    console.log(e)
}) */

//Creating the async function 

const updateageandcount = async(id,age)=>{
    const user = await User.findByIdAndUpdate(id,{age})
    const count = await User.countDocuments({age})
    return count
}

updateageandcount('5e93ed6300eb9114b4703912',28).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})
