import React from 'react';
import create from 'zustand';

// test용 state
interface State{
  bears: number;
  increasePopulation: ()=>void;
  decreasePopulation: ()=>void;
  removeAllBears: ()=>void;
}
interface Person{
  name: string;
  age: number;
  greeting: string;
}
interface Update{
  updateName: (name: Person['name']) => void;
  updateAge: (name: Person['age']) => void;
  updateGreeting: (name: Person['greeting']) => void;
}
export const useStore = create<State>(set => ({
  bears: 0,
  increasePopulation: ()=>set((state)=>({bears: state.bears+1})),
  decreasePopulation: ()=>set((state)=>({bears: state.bears-1})),
  removeAllBears: ()=>set({bears:0}),
}));
export const usePerson = create<Person&Update>(set => ({
  name: "anony",
  age: 0,
  greeting: "hi",
  updateName: (name)=>set(()=>({name: name})),
  updateAge: (age)=>set(()=>({age: age})),
  updateGreeting: (greeting)=>set(()=>({greeting: greeting})),
}));

interface SelectContentState { //ts를 사용하기때문에 타입지정이 필요.js사용시 미사용 코드
  selectContent: number;
  setSelectContent: (select: number) => void;
}

// create를 이용해서 store을 생상헐 수 있으며, 다수의 store도 생성 가능하다.
export const useStoreTest = create<SelectContentState>((set) => ({
  // create 함수의 매개변수로 콜백함수를 받는데 이 콜백함수의  return객체에 state,
  // setState를 넣는다.
  selectContent: window.localStorage.getItem('select') ? 
  	Number(window.localStorage.getItem('select')) : 0,
  setSelectContent: (select) => {
    set((state) => ({ ...state, selectContent: select }));
  },
}));
