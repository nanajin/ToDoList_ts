import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePersonStore } from '../store/store';
import "../ToDoList.scss";

const LoginForm = () => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const {id, password, nickname} = usePersonStore();
  const setId = usePersonStore(state=>state.setId);
  const setPwd = usePersonStore(state=>state.setPwd);
  const setNickName = usePersonStore(state=>state.setNickName);
  const [check, setCheck] = useState(false);
  const navigate= useNavigate();

  const onChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {target: {value, name}} = event;
    if(name==="id"){
      setId(value);
    }
    else if(name==="pwd"){
      setPwd(value);
    }
    else if(name==="nickname"){
      setNickName(value);
    }
    else if(name==="pwdCheck"){
      if(value===password){
        setCheck(true);
      }
      else{
        setCheck(false);
      }
    }
  }
  const onSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!toggleLogin){
      if(check){
        localStorage.setItem(`userInfo-${id}`, JSON.stringify({id: id, password: password, nickname: nickname}));
        alert("회원가입에 성공하셨습니다. 다시 로그인해주세요");
        setId("");
        setPwd("");
        setToggleLogin(true);
      }
      else{
        alert("비밀번호가 일치하지 않습니다");
      }
    }
    else{
      const userInfo = JSON.parse(localStorage.getItem(`userInfo-${id}`)!);
      if(!userInfo){
        alert("회원정보가 없습니다");
      }
      if(userInfo.id === id && userInfo.password === password){
        alert("환영합니다");
        navigate("/");
      }
      else{
        alert("아이디/비밀번호가 맞지 않습니다");
      }
    }
  }
  const handleChange = ()=>{
    setToggleLogin(prev=>!prev)
    setId("");
    setPwd("");
  }
  return (
    <div>
      <form onSubmit={onSubmit} className="login-form">
        {toggleLogin? <h1>로그인</h1>: <h1>회원가입</h1>}
        <div className='input-container'>
        <input type="text" 
          placeholder='ID' 
          name='id'
          value={id}
          onChange={onChange}
          required
        />
        <input type="password" 
          placeholder='PassWord' 
          name='pwd'
          value={password}
          onChange={onChange}
          required
        />
        {!toggleLogin && 
          <>
            <input type="password" 
              placeholder='PassWord Check' 
              name='pwdCheck'
              onChange={onChange}
              required
            />
            <input type="text" 
              placeholder='NickName' 
              name='nickname'
              onChange={onChange}
              required
            />
            <div className='pwd-check'>{check? "비밀번호가 일치합니다": "비밀번호가 일치하지 않습니다"}</div>
          </>
        }
        </div>
        <input type="submit" 
          value={!toggleLogin? "회원가입":"로그인"}
          className="submit"/>
      </form>
      <button onClick={handleChange} className="toggle-login">
        {toggleLogin? "회원가입하시겠습니까?":"로그인하시겠습니까?"}
      </button>
    </div>
  );
};

export default LoginForm;