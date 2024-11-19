import React from 'react'
import './styles.css'
import { Todo } from '../model'
import Todo_item from './Todo_item';

interface Props{
    todoList: Todo[];
    setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>;

}

const TodoList:React.FC<Props> = ({todoList, setTodolist}) => { // need to define types for both inputs
  return (
    <div className='TodoList'>
        {
            todoList.map((t)=>(
                <Todo_item
                todo ={t} 
                key = {t.id}
                todoList = {todoList}
                setTodolist = {setTodolist}
                />
            ))
            }
    </div>
  )
}

export default TodoList