import { useEffect } from "react";
import create from "zustand";

interface Person{
  id:string;
  password:string;
  nickname:string;
}
interface Update{
  setId: (id:Person['id'])=>void;
  setPwd: (id:Person['password'])=>void;
  setNickName: (id:Person['nickname'])=>void;
}
export const usePersonStore = create<Person&Update>(set=>({
  id: "",
  password: "",
  nickname: "",
  setId: (newId)=>set(()=>({id: newId})),
  setPwd: (newPwd)=>set(()=>({password: newPwd})),
  setNickName: (newNickname)=>set(()=>({nickname: newNickname})),
}));

// export const userInfo = JSON.parse(localStorage.getItem("userInfo")!);