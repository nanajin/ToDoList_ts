import React, {useEffect} from 'react';
import { usePerson, useStore, useStoreTest } from './store/testStore';
const Test = () => {
  const {name, age, greeting} = usePerson();
  const {bears, increasePopulation, decreasePopulation, removeAllBears} = useStore();
  const updateName = usePerson(state=>state.updateName);
  const updateAge = usePerson(state=>state.updateAge);
  // console.log(name, age, greeting);
  let newName:string;
  let newAge:number;
  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {target: {value, name}} = e;
    if(name==="name"){
      newName = value;
    }
    else if(name==="age"){
      newAge = Number(value);
    }
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    updateName(newName);
    updateAge(newAge);
  }
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{bears}</p>
      <button onClick={increasePopulation}>+</button>
      <button onClick={decreasePopulation}>-</button>
      <button onClick={removeAllBears}>clear</button>
      <form onSubmit={onSubmit}>
        <input type="text" 
          placeholder='name' 
          onChange={onChange} 
          name="name"
          required
        />
        <input type="number" 
          placeholder='age' 
          onChange={onChange} 
          name="age"
          required
        />
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
};

export default Test;