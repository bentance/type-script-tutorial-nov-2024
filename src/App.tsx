import { useState } from 'react'
import './App.css'
import InputField from './componets/InputField'
import { Todo } from './model'
import TodoList from './componets/TodoList';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

const App:React.FC = () =>{

  const[todo,setTodo] = useState<string>("");

  // it will be an array of todos 
  const[todoList,setTodolist] = useState<Todo[]>([]);

  const[completedTodoList, setCompletedTodoList] = useState<Todo[]>([]);

  const handleAdd = (e:React.FormEvent) => {

    e.preventDefault();

    if(todo){ //if these is something in todo, if to != null, execute below

      setTodolist([...todoList, {id: Date.now(), todo:todo, isDone:false}]);
      setTodo("");

    }

  };

  const onDragEnd = (result:DropResult)=>{

    const{source, destination} = result;
    console.log(result)

    if(!destination)return;

    if(
      destination.droppableId === source.droppableId && 
      destination.index === source.index
    ) 
      return;

    let add,
      active = todoList, 
      complete = completedTodoList;


    if(source.droppableId === "TodosList"){
      add = active[source.index];
      active.splice(source.index, 1)

    } else {
      add = active[source.index];
      complete.splice(source.index, 1)
    }

    //
    if(destination.droppableId === "TodosList"){
      active.splice(destination.index, 0, add)

    } else {
      complete.splice(destination.index, 0, add)

    }

    setCompletedTodoList(complete);
    setTodolist(active);


  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className='App'>
      <span className="heading">
        Taskify
      </span>
      <InputField todo = {todo}
      setTodo = {setTodo}
      handleAdd={handleAdd}/>
      <TodoList 
      todoList ={todoList} 
      setTodolist= {setTodolist}
      completedTodoList={completedTodoList} 
      setCompletedTodoList={setCompletedTodoList}
      />

    </div>
    </DragDropContext>
  );
};

export default App


