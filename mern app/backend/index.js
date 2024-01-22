
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 5000
 app.use(cors())
 app.use(express.json())

 mongoose.connect('mongodb://localhost:27017/mern_app',{
     useNewUrlParser:true,
     useUnifiedTopology:true
 })

const connction  = mongoose.connection;
connction.once('open',()=>{
    console.log("Connected Db");
})

// scheam 
const todoSchema = new mongoose.Schema({
     text:String,
     completed:Boolean
})

const Todo = mongoose.model('Todo',todoSchema)

// ADD DATA To DB 

app.get('/api/todos',async(req,res)=>{
     const todos = await Todo.find()
     res.json(todos)
})

app.post('/api/todos', async(req,res)=>{
      const {text,completed} = req.body;
      const newTodo = new Todo({
         text,completed
      })
      await newTodo.save()
      res.json(newTodo)
      console.log("data added successfully");
})
// delete query
app.delete('/api/todos/:id',async(req,res)=>{
    const {id} = req.params
    await Todo.findByIdAndDelete(id)
    res.json('message:"todo deleted')
})
// update 
app.put('/api/todos/:id', async(req,res)=>{
     const {id} = req.params;
     const {text,completed} = req.body;
     await Todo.findByIdAndUpdate(id, {text,completed})
     res.json({message:'todo updated'})
})



 app.listen(PORT,()=>{
     console.log(`server is runing on  PORT ${PORT}`);
 })