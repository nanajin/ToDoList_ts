import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { usePersonStore } from './store/store';
import ToDoList from './ToDoList';
import {BiLogIn} from "react-icons/bi";
import "./ToDoList.scss";

const Home = () => {
  const {id} = usePersonStore();
  const setId = usePersonStore(state=>state.setId);
  const setPwd = usePersonStore(state=>state.setPwd);
  const userInfo = JSON.parse(localStorage.getItem(`userInfo-${id}`)!);
  const navigate = useNavigate();
  const handleLogout = ()=>{
    setId("");
    setPwd("");
    navigate("/auth");
    // localStorage.removeItem("userInfo");
    // window.location.reload();
  }
  return (
    <div>
      {userInfo? 
        <div className='after-login'>
          <ToDoList/>
        </div>: 
        <div className='home-container'>
          <h1>YOUR TODO LIST!</h1>
          <p>아직 로그인 전이신가요?</p>
          <Link to="/auth" className='login-link'><BiLogIn/>Login</Link>
        </div>
      }
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
};

export default Home;