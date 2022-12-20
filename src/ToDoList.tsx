import React, { useEffect, useState } from 'react';

function ToDoList() {
  const [todo, setTodo] = useState("");
  const data = localStorage.getItem("todo");
  const list = data? [...JSON.parse(data!)]: []; 
  const [todolist, setTodoList] = useState(list);
  const [edit, setEdit] = useState(false);
  interface Store{
    id: number,
    text: string,
  }
  useEffect(()=>{
    localStorage.setItem("todo", JSON.stringify(todolist));
  },[todolist]);

  const onChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {value} = event.target;
    setTodo(value);
  }
  const onSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const id = Math.floor(Math.random()*1000)+1;
    const todos:Store = {id: id, text: todo};
    setTodoList((prev)=>[...prev, todos]);
    setTodo("");
    if(edit){
      setEdit(false);
    }
  }

  const handleRemove = (id:number)=>{
    const newTodo = todolist.filter((item:Store)=>{ 
      return item.id !== id});
    setTodoList(newTodo);
  }
  const handleEdit = (id:number, text:string)=>{
    setTodo(text);
    setEdit(true);
    handleRemove(id);
  }
  return (
    <div> 
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          placeholder="What's Your TODO?" 
          onChange={onChange}
          value={todo}/>
        <input type="submit" value={edit? "Edit": "Submit"}/>
      </form>
      {!edit &&<>
        {todolist.map((item:Store, index:number)=>{
          return(
            <ul key={index}>
              <li>{item.text}</li>
              <button onClick={()=>handleRemove(item.id)}>X</button>
              <button onClick={()=>handleEdit(item.id, item.text)}>Edit</button>
            </ul>
          )
        })}
      </>}
    
    </div>
  );
}

export default ToDoList;
