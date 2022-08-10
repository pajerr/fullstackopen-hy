import React, { useState } from "react";

const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
};

/*
const Points = () => {
  return (
  new Array(5).fill(0)
  )
}*/

const getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};

//eka chekataan että onko yhtään votea ja jos ei ole nii palautetaa eka if chekin retrun
//jos on nii renderöitään kopio taulukosta näkyviin mikä näyttää palautetun anekdootin votejen määrän
const VoteStats = ({ points, anecdote, totalVotes }) => {
  if (totalVotes == 0) {
    return <div>No votes yet</div>;
  }
  //bugi jossain että aina kun 5 niin lukee "Has votes" vaik pitäis lukea "Has 0 votes"
  //arrayssa oli vsii 1 liian vääh, lisätty new Array(6)
  return <div>Has {points[anecdote]} votes</div>;
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [totalVotes, setNewVote] = useState(0);
  const points = new Array(6).fill(0);

  const handleClick = () => {
    setSelected(getRandomInt(0, 6));
    setNewVote(totalVotes + 1);
    console.log(selected);
    console.log(anecdotes[selected]);
  };

  //miten saadaan returnattua tuo oikeaan paikkaan..?
  const handleVoteClick = ({ selected }) => {
    const cloneOfPoints = [...points];
    cloneOfPoints[selected] += 1;
    return cloneOfPoints;
  };

  return (
    <div>
      {props.anecdotes[selected]}
      <VoteStats points={points} anecdote={selected} totalVotes={totalVotes} />
      <Button onClick={handleClick} text="Next anecdote" />
      <Button onClick={handleVoteClick} text="Vote" />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

export default App;
