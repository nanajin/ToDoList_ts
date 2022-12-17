import React, { useState } from 'react';

function ToDoList() {
  const [todo, setTodo] = useState("");
  const data = localStorage.getItem("todo");
  let todolist:string[] = data? [...JSON.parse(data!)]: []; 
  const onChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {value} = event.target;
    setTodo(value);
  }
  const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    todolist.push(todo);
    localStorage.setItem("todo", JSON.stringify(todolist));
    setTodo("");
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="What's Your TODO?" 
          onChange={onChange}
          value={todo}/>
        <input type="submit" placeholder="Submit"/>
      </form>
      {todolist.map((item:string, index:number)=>{
        return(
          <ul key={index}>
            <li>{item}</li>
          </ul>
        )
      })}
    </div>
  );
}

export default ToDoList;
