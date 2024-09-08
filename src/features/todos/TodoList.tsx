import { useGetTodosQuery, useUpdateTodoMutation, useDeleteTodoMutation, useAddTodoMutation } from "../api/apiSlice"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTrash, faUpload} from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useState } from "react"

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const {data: todos, isLoading, isSuccess, isError, error} = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idsArray = todos?.map(todo=>Number(todo.id))
    addTodo({userId: 1, id:String(Math.max(...idsArray??[0])+1), title: newTodo, completed: false})
    setNewTodo('');
  }

  const newItemSelection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input type="text" id="new-todo" value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} placeholder="Enter new todo"/>
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload}/>
      </button>
    </form>
  )

  let content;
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = todos.map(todo => (
      <article key={todo.id}>
        <div className="todo">
          <input type="checkbox" checked={todo.completed} id={todo.id} onChange={()=>updateTodo({...todo, completed: !todo.completed})} />
          <label htmlFor={todo.id}>{todo.title}</label>
        </div>
        <button className="trash" onClick={()=>deleteTodo({id: todo.id})}>
          <FontAwesomeIcon icon={faTrash}/>
        </button>
      </article>
    ))
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSelection}
      {content}
    </main>
  )
}

export default TodoList