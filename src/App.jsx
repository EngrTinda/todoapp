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


  return (
    <div className="todo container">
      <TodoSearch add_todo = {addTodo}/>
      <TodoFilter />
      <TodoList todos = {todos} delete_todo = {deleteTodo}/>
      
    </div>
  )
}

export default App
