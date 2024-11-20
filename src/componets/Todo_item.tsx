import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import './styles.css'
import { Draggable } from 'react-beautiful-dnd';

type Props ={
    index: number;
    todo: Todo,
    todoList: Todo[],
    setTodolist:React.Dispatch<React.SetStateAction<Todo[]>>
}

const Todo_item=  ({index, todo,todoList, setTodolist}:Props) => {

    //when edit icon is pressed, an input box appears
    const [edit,setEdit]=useState<boolean>(false);

    const[editTodo,setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id:number) => {
        setTodolist(
            todoList.map((todo)=> 
                todo.id===id?{...todo, isDone:!todo.isDone }:todo //if id not match, return todo unchanged
                
        )
    );
    };

    const handleDelete = (id:number) => {
            // Filter out the todo item that matches the given `id`
            setTodolist(todoList.filter((todo) => todo.id !== id));
    };

    const handleEdit = (e:React.FormEvent,id:number) =>{ 
        e.preventDefault();
        setTodolist(
            todoList.map((todo)=> 
                todo.id===id?{...todo, todo:editTodo }:todo //...todo means take all the properties of the object
        )
    );
    setEdit(false)
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        inputRef.current?.focus();
    }, [edit])

  return (
    <Draggable draggableId={todo.id.toString()} index = {index}>

        {
            (provided, snapshot)=>(
            <form className={`Todo_item ${snapshot.isDragging? "drag" : ""} `} 
            onSubmit={(e)=>handleEdit(e,todo.id)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref = {provided.innerRef}
            
            >
                {
                    edit?(
                        <input
                        ref = {inputRef} 
                        value = {editTodo}
                        onChange={(e)=> setEditTodo(e.target.value)}
                        className='Todo_item__single--text'/>
                    ):(
                            todo.isDone? (
                                <s className="Todo_item__single--text">{todo.todo}</s>
                            ):(
                                <span className="Todo_item__single--text">{todo.todo}</span>
                            )                       
                    )

                }

                    <div>
                        <span className="icon"onClick = { () =>{
                            if(!edit && !todo.isDone){ //if edit is false, and isDone is false
                                setEdit(!edit) //set edit as true, initiate edit mode

                            }}
                        }>
                            <AiFillEdit/>
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete/>
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdDone/>
                        </span>
                    </div>
            </form>
            )
        }
    </Draggable>
  )
}

export default Todo_item