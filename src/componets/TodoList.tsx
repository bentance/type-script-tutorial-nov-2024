import React from 'react'
import './styles.css'
import { Todo } from '../model'
import Todo_item from './Todo_item';
import { Droppable } from 'react-beautiful-dnd';

interface Props{
    todoList: Todo[];
    setTodolist: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodoList:Todo[]
    setCompletedTodoList: React.Dispatch<React.SetStateAction<Todo[]>>

}

const TodoList:React.FC<Props> = ({todoList, setTodolist,completedTodoList,setCompletedTodoList }) => { // need to define types for both inputs
  return (
    <div className='container'>
      
      {/* ACTIVE TASK  */}
      <Droppable droppableId='TodosList'>
        {(provided, snapshot)=>(
                <div className={`TodoList ${snapshot.isDraggingOver?"dragactive":""}` }
                ref = {provided.innerRef}
                {...provided.droppableProps}
                >
                <span className="TodoList__heading">Active Tasks</span>
                { 
                    todoList.map((t, index)=>(
                      <Todo_item
                      index = {index}
                      todo ={t} 
                      key = {t.id}
                      todoList = {todoList}
                      setTodolist = {setTodolist}
                      />
              ))
                }
            
              {provided.placeholder} 

              </div>
        )}
      </Droppable>

      {/* COMPLETED TASK  */}
      <Droppable droppableId='TodosListRemove'>
        {
          (provided,snapshot) => (
              <div className={`TodoList remove${snapshot.isDraggingOver?"dragcomplete":""}`}
              ref = {provided.innerRef}
              {...provided.droppableProps}>
                <span className="TodoList__heading">Completed Tasks</span>
                { 
                    completedTodoList.map((t , index)=>(
                      <Todo_item
                      index = {index}
                      todo ={t} 
                      key = {t.id}
                      todoList = {completedTodoList}
                      setTodolist = {setCompletedTodoList}
                      />
              ))
                }

                {provided.placeholder} 
              </div>



          )

        }


      </Droppable>



    </div>
  )
}

export default TodoList

