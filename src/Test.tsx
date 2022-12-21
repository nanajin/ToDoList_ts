import React, {useEffect} from 'react';
import { usePerson, useStore, useStoreTest } from './store/store';
// import useStore, useStorePerson from './store/store';
const Test = () => {
  const {name, age, greeting} = usePerson();
  const {bears, increasePopulation, decreasePopulation, removeAllBears} = useStore();
  const updateName = usePerson(state=>state.updateName);
  // useStorePerson.setState({ name: "mijin", greeting: "hello"});
  console.log(name, age, greeting);
  useEffect(()=>{
    updateName("mijin");
  },[]);
  // updateName("mijin");
  // console.log(`bears: ${bears}`);
  return (
    <div>
      <p>Zustand</p>
      <p>Test</p>
      {/* <p>{name}</p> */}
      <p>{bears}</p>
      <button onClick={increasePopulation}>+</button>
      <button onClick={decreasePopulation}>-</button>
      <button onClick={removeAllBears}>clear</button>
    </div>
  );
};

export default Test;