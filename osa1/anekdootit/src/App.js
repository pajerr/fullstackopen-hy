import { useState } from "react";

//otetaan anecdootti array vastaan ja palautetaan random anekdootti listalta
const DisplayAnecdote = ({ anecdotes, selected }) => {
  //const randomInt = getRandomInt(0, 5);
  return <div>{anecdotes[selected]}</div>;
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);

  const handleClick = () => {
    console.log(getRandomInt(0, 6));
    setSelected(getRandomInt(0, 6));
    <DisplayAnecdote anecdotes={anecdotes} selected={getRandomInt()} />;
  };

  return (
    <div>
      <DisplayAnecdote anecdotes={anecdotes} selected={selected} />
      <Button handleClick={handleClick} text="Next anecdote" />
    </div>
  );
};

export default App;
