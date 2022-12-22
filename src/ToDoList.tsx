import React, { useEffect, useState } from 'react';
import "./ToDoList.scss";
import {BiTrash, BiEditAlt} from "react-icons/bi";
import {BsFillBookmarkCheckFill, BsBookmarkCheck} from "react-icons/bs";

function ToDoList() {
  const [todo, setTodo] = useState("");
  const data = localStorage.getItem("todo");
  const list = data? [...JSON.parse(data!)]: []; 
  const [todolist, setTodoList] = useState(list);
  const [edit, setEdit] = useState(false);
  // const [check, setCheck] = useState(false);
  let check = false;
  interface Store{
    id: number,
    text: string,
    done: boolean,
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
    const todos:Store = {id: id, text: todo, done: false};
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

  const handleCheck = (item:Store)=>{
    if(item.done === true){
      check = false;
    }
    else if(item.done === false){
      check = true;
    }
    console.log(check);
    handleRemove(item.id);
    const todos:Store = {id: item.id, text: item.text, done: check};
    if(check){
      setTodoList((prev)=>[...prev, todos]);
    }
    else{
      setTodoList((prev)=>[todos, ...prev]);
    }
    // setTodoList((prev)=>[...prev, todos]);
    // console.log(item.id, item.done);
  }  

  return (
    <div className='container'> 
      <form onSubmit={onSubmit} className="todo-form">
        <input 
          type="text" 
          placeholder="What's Your TODO?" 
          onChange={onChange}
          value={todo}
        />
        <input type="submit" value={edit? "Edit": "Submit"}/>
      </form>
      {!edit &&<>
        {todolist.map((item:Store, index:number)=>{
          return(
            <ul key={index} className="todo-list">
              <label className='lb'>
                <input type="checkbox" className='icb' onClick={()=>handleCheck(item)}/>
                {item.done? <div className='check'><BsFillBookmarkCheckFill/></div>:
                  <div className='non-check'><BsBookmarkCheck/></div>
                }
              </label>
              <li className={item.done? "done":""}>{item.text}</li>
              <div className='todo-btn'>
                <button onClick={()=>handleRemove(item.id)}><BiTrash/></button>
                <button onClick={()=>handleEdit(item.id, item.text)}><BiEditAlt/></button>
              </div>
            </ul>
          )
        })}
      </>}
    
    </div>
  );
}

export default ToDoList;
