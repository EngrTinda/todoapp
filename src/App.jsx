import { useState, useEffect } from 'react'

import TodoSearch from './components/TodoSearch'
import TodoFilter from './components/TodoFilter'
import TodoList from './components/TodoList'
import axios from 'axios'

function App() {

  let [todos, setTodos] = useState( [ ]);
  const[allTodos, setAllTodos] = useState([])
  const[ errors, setErrors] = useState("")

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/todos")
    .then((res) => setTodos(res.data))  
    .catch((err) => setErrors(err.message))
   
  }, [])

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    const originalTodos = [...todos]
    axios.delete("http://127.0.0.1:8000/todos/" + id)
    .catch((err) => {
      setErrors(err.message)
      setTodos(originalTodos)
    }) 
  }

  const addTodo = (data) => {
    const originalTodos = [...todos];
    setTodos([...todos, data = {...data, id: parseInt(todos[todos.length-1].id) + 1, status: "Active"}])
    axios.post("http://127.0.0.1:8000/todos", data)
    .then(res => setTodos([...todos, res.data]))
    .catch((err) => {
      setErrors(err.message)
      setTodos(originalTodos)
    })  
  }
  
  // let updatedTodo = (e, id, text, todo) => {
  //   // let todo = todos[id]
  //   e.preventDefault()
  //   let updatedUser = {...todo, task: text, status: "Active"}
  //   setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
  //   const updatedTodo = {...todos, task:text}
  //   axios.patch("http://127.0.0.1:8000/todos/" + id, updatedTodo)
  // }
  const updatedTodo = (e, id, text, todo) => {
  e.preventDefault()
  const updated = { ...todos, task: text, status: "Active" }

  // Update frontend
  setTodos(todos.map(t => t.id === id ? updated : t))

  // Update backend
  axios.patch("http://127.0.0.1:8000/todos/" + id, updated)
    .catch((err) => {
      setErrors(err.message)
    })
}
  // let completeTodo = (e, id, todo) => {
  //   if (e.target.checked) {
  //     setTodos(todos.map((todo) => todo.id === id ? {...todo, completed: true} : todo))
  //     const updatedTodo = {...todos, completed:true}
  //     axios.patch("http://127.0.0.1:8000/todos/" + id, updatedTodo)
  //   }
  //   else {
  //     setTodos(todos.map((todo) => todo.id === id ? {...todo, completed: false} : todo))
  //     const updatedTodo = {...todos, completed:false}
  //     axios.patch("http://127.0.0.1:8000/todos/" + id, updatedTodo)
  //   }

  // }
  const completeTodo = (e, id, todo) => {
  const isCompleted = e.target.checked;
  const updated = { ...todo, status: isCompleted ? "Completed" : "Active" };

  // Update frontend state
  setTodos(todos.map(t => t.id === id ? updated : t));

  // Sync with backend
  axios
    .patch("http://127.0.0.1:8000/todos/" + id , updated)
    .catch((err) => {
      setErrors(err.message);
    });
};


  let filterTodo = (status) => {
    if(!status) {
      setTodos(allTodos);
      
    } else {
      setTodos(allTodos.filter(todo => todo.status === status))

    }
    // setTodos(todos.filter(todo => todo.status === text))
    
  } 

  return (
    <>
      {errors && <p>{errors}</p>}
      <TodoSearch add_todo = {addTodo}/>
      <TodoFilter filter_todo = {filterTodo}/>
      <TodoList todos = {todos} delete_todo = {deleteTodo} updated_todo = {updatedTodo} complete_todo = {completeTodo}/>
      
    </>
  );
}

export default App
