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
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={total} />      
      <StatisticLine text="Average" value={(good - bad)/total} />
      <StatisticLine text="Positive" value={good/total*100} text2="%"/>
    </div>
  )
}

const StatisticLine = ({text, value, text2}) => {
  return (
    <div>{text} {value} {text2}
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