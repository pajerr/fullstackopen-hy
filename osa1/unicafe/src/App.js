import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return <div>No feedback given yet</div>;
  }

  return (
    <div
      style={{
        textAlign: "left",
      }}
    >
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={(good - bad) / total} />
          <StatisticLine
            text="Positive"
            value={(good / total) * 100}
            text2="%"
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticLine = ({ text, value, text2 }) => {
  return (
    <tr>
      <th>{text}</th>
      <th>{value}</th>
      <th>{text2}</th>
    </tr>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
