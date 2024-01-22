
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
function App() {
 const [todos,setTodos] = useState([])
 const [newTodo,setNewTodo] = useState('')

//  get data 
  useEffect(()=>{
    axios.get('http://localhost:5000/api/todos')
    .then(response=> setTodos(response.data))
     .catch(error => console.error(error))
  },[])

// add data
  const addTodo = ()=>{
     axios.post('http://localhost:5000/api/todos',{
       text:newTodo,
       completed:false
     })
     .then(response => setTodos([...todos,response.data]))
     .catch(error => console.log(error))
      setNewTodo('')
  }

  // deleteTodo
   const deleteTodo = (id)=>{
     axios.delete(`http://localhost:5000/api/todos/${id}`)
     .then(()=> setTodos(todos.filter(todo=> todo._id !== id)))
     .catch(error=> console.error(error))
   }
// update data 

 const updateTodo = (id,completed)=>{
   axios.put(`http://localhost:5000/api/todos/${id}` , {completed})
   .then(()=> setTodos(todos.map(todo=> todo._id === id ? {...todo, completed} : todo)))
   .catch(error=> console.error(error))
 }

  return (
    <>
       <div className="form">
         <h1>Mern Todo App</h1>
         <input type="text" value={newTodo}
         onChange={(e)=> setNewTodo(e.target.value)} />
         <button onClick={addTodo}>Add Todo</button>
       </div>
        <div className="getdata">
        <ul>
          {
            todos.map((item)=>(
              <li>
                  <span
                  style = {{
                      textDecoration: item.completed ? 'line-through' : 'none',
                      color: item.completed ? 'indigo' : 'black',
                      fontWeight : item.completed ? 'normal' :'bold'
                  }}
                  
                  onClick={()=> updateTodo(item._id , !item.completed)}>
                     {item.text}
                  </span>
                  <button onClick={()=> deleteTodo(item._id)}>Delete Todo</button>
              </li>
            ))
          }
        </ul>
        </div>
    </>
  )
}

export default App
