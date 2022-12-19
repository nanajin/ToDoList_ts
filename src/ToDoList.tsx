import React, { useEffect, useState } from 'react';

function ToDoList() {
  const [todo, setTodo] = useState("");
  const data = localStorage.getItem("todo");
  const list:string[] = data? [...JSON.parse(data!)]: []; 
  const [todolist, setTodoList] = useState<string[]>(list);

  useEffect(()=>{
    localStorage.setItem("todo", JSON.stringify(todolist));
  },[todolist]);

  const onChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {value} = event.target;
    setTodo(value);
  }
  const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    setTodoList((prev)=>[...prev, todo]);
    setTodo("");
  }
  const onRemove = (event:React.MouseEvent<HTMLButtonElement>)=>{
    const e = event.target as HTMLDivElement;
    const li = e.parentNode?.childNodes[0];
    const removeContent = li?.textContent;
    const newTodo = todolist.filter((item)=>{ return item !== removeContent});
    setTodoList(newTodo);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="What's Your TODO?" 
          onChange={onChange}
          value={todo}/>
        <input type="submit" value="Submit"/>
      </form>
      {todolist.map((item:string, index:number)=>{
        return(
          <ul key={index}>
            <li>{item}</li>
            <button onClick={onRemove}>X</button>
          </ul>
        )
      })}
    </div>
  );
}

export default ToDoList;
