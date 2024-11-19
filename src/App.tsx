import { useState } from 'react'
import './App.css'
import InputField from './componets/InputField'
import { Todo } from './model'
import TodoList from './componets/TodoList';

const App:React.FC = () =>{

  const[todo,setTodo] = useState<string>("");

  // it will be an array of todos 
  const[todoList,setTodolist] = useState<Todo[]>([]);

  const handleAdd = (e:React.FormEvent) => {

    e.preventDefault();

    if(todo){ //if these is something in todo, if to != null, execute below

      setTodolist([...todoList, {id: Date.now(), todo:todo, isDone:false}]);
      setTodo("");

    }

  };

  return (
    <div className='App'>
      <span className="heading">
        Taskify
      </span>
      <InputField todo = {todo}
      setTodo = {setTodo}
      handleAdd={handleAdd}/>
      <TodoList 
      todoList ={todoList} 
      setTodolist= {setTodolist}/>

    </div>
  );
};

export default App


