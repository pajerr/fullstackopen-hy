import { useState } from "react";

//otetaan anecdootti array vastaan ja palautetaan random anekdootti listalta
const DisplayAnecdote = ({ anecdotes, selected }) => {
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
const VoteStats = ({ selected, points, totalVotes }) => {
  console.log("points[selected] arvo:", points[selected]);
  //kutsutaan funktiota joka tarkistaa onko points tyhja
  //const pointsEmpty = noVotes(points);
  if (points[selected] === 0) {
    return <div>No votes yet</div>;
  } else {
    return <div>Has {points[selected]} votes</div>;
  }
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
  const [allVotes, setAll] = useState(0);
  //let points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  //let points = new Array(6).fill(0);
  const [points, setPoints] = useState(new Array(6).fill(0));

  /*
  const handleClick = ({ anecdotes, selected }) => {
    const newSelected = selected;
    setSelected(newSelected);
    <DisplayAnecdote anecdotes={anecdotes} selected={newSelected} />;
  };
*/
  const handleVoteClick = ({ selected, points }) => {
    console.log("points array in voteClick:", points[selected]);
    let newPoints = points;
    points[selected] += 1;
    setPoints(newPoints);
    console.log("VOTED...");
    console.log(
      "points in vote array in voteClickComponent:",
      points[selected]
    );
  };

  //<updateSelected randomInt={getRandomInt(0, 6)} />
  return (
    <div>
      <DisplayAnecdote anecdotes={anecdotes} selected={selected} />
      <VoteStats points={points} anecdote={selected} />
      <Button
        handleClick={() => {
          setSelected(getRandomInt(0, 6));
        }}
        text="Next anecdote"
      />
    </div>
  );
};

export default App;
