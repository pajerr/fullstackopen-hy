import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad, total}) => {
  if (total === 0) {
    return (
      <div>
        No feedback given yet
      </div>
    )
  }

  return (
    <div>
      Good: {good}<br />
      Neutral: {neutral}<br />
      Bad: {bad}<br />
      All: {total}<br />
      Average: {(good - bad)/total}<br />
      Positive: {good/total*100} %
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setGood(good +1)
    setTotal(total +1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral +1)
    setTotal(total +1)
  }

  const handleBadClick = () => {
    setBad(bad +1)
    setTotal(total +1)
  }

  return (
    <div>
      <div>
        <h1>Give feedback</h1>
      <Button onClick={handleGoodClick} text='Good' />
      <Button onClick={handleNeutralClick} text='Neutral' />
      <Button onClick={handleBadClick} text='Bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)