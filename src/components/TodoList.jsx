import React, {useState} from 'react'
import { FiEdit } from 'react-icons/fi'; 
import {MdDelete} from 'react-icons/md';



const TodoList = ({todos, delete_todo, updated_todo, complete_todo}) => {
  let [toggle, setToggle] = useState(false)
  let [todoItem, setTodoItem  ] = useState("")
  let [todoId, setTodoId] = useState(0)
  let [todo, setTodo] = useState({})
  const toggleModal = (item, id, todo) => {
    setToggle(true)
    setTodoItem(item)
    setTodoId(id)
    setTodo(todo)
  }
  return (
  <>
    <div className="todo-list">

        {todos.map((todo) => (
          <div className="todo-list-item" key={todo.id}>
            <div className="task">
                <input type="checkbox" onChange={(e) => complete_todo(e, todo.id, todo)}/>
                <p id='todo_task' className={todo.status == "Completed"? "strike": ""}>{todo.task}</p>
            </div>


            <div className="btn-container">
                <div className="edit"><FiEdit size={25} onClick={() => toggleModal(todo.task, todo.id, todo)}/></div>
                <div className="del" ><MdDelete size={25} onClick={ () => delete_todo(todo.id)}/></div>
            </div>
        </div>
        ))}
      </div> 

      {/* modal container */}
   
      {toggle && <div className="modal-container">
        <div className="modal">
          <h1>Update Form</h1>

          <form action="" onSubmit={(e) => {
            updated_todo(e, todoId, todoItem, todo);
            setToggle(false)
            }}>
            <input type="text" placeholder='Update todo' value={ todoItem } onChange={(e) => setTodoItem(e.target.value)} required />
            <button id='add'>Add</button>
          </form>

          <div className='btn-container'>
            <button className='cancel mod-btn' onClick={() => {setToggle(false)}}>Cancel</button>
            

          </div>
        </div>
        
      
        
      </div>}
  </>)}

export default TodoList