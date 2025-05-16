import { useState } from 'react'

import TodoSearch from './components/TodoSearch'
import TodoFilter from './components/TodoFilter'
import TodoList from './components/TodoList'

function App() {

  let [todos, setTodos] = useState([
    { id: 0, task: 'Learn React', status: "Active"},
    { id: 1, task: 'Learn Redux', status: "Active"},
    { id: 2, task: 'Learn JavaScript', status: "Active"},
    { id: 3, task: 'Learn CSS', status: "Active"},
    
  ])

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const addTodo = (data) => {
    setTodos([...todos, data = {...data, id: parseInt(todos[todos.length-1].id) + 1, status: "Active"}])
    console.log(data)
  }
  
  let updatedTodo = (id, new_task) => {
    let todo = todos[id]
    let updatedTodo = {...todo, task: new_task, status: "Active"}
    setTodos(todos.map((todo) => todo.id === id ? updatedTodo : todo))
  }
  let completeTodo = (e, id) => {
    if (e.target.checked) {
      setTodos(todos.map((todo) => todo.id === id ? {...todo, status: "Completed"} : todo))
    }
    else {
      setTodos(todos.map((todo) => todo.id === id ? {...todo, status: "Active"} : todo))
    }

  }
  let filterTodo = (text) => {
    setTodos(todos.filter(todo => todo.status === text))
    
  } 

  return (
    <>
      <TodoSearch add_todo = {addTodo}/>
      <TodoFilter filter_todo = {filterTodo}/>
      <TodoList todos = {todos} delete_todo = {deleteTodo} updated_todo = {updatedTodo} complete_todo = {completeTodo}/>
      
    </>
  );
}

export default App
