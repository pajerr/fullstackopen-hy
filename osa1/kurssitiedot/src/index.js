import React from 'react'
import ReactDOM from 'react-dom'

/*
const Header = (props) => { 
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
      {props.part} {props.excercies}
      </p>
    </div>
  )    
}

const Total = (props) => {
  return (
    <div>
      <p>
      Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </div>
  ) 
}

const App = () => {
  // const-määrittelyt
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} excercies={exercises1}/>
      <Content part={part2} excercies={exercises2}/>
      <Content part={part3} excercies={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}
*/

const Header = (props) => { 
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
      {props.part} {props.excercies}
      </p>
    </div>
  )    
}

const Total = (props) => {
  return (
    <div>
      <p>
      Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </div>
  ) 
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content part={part1.name} excercies={part1.exercises}/>
      <Content part={part2.name} excercies={part2.exercises}/>
      <Content part={part3.name} excercies={part3.exercises}/>
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
    </div>
  )
}









ReactDOM.render(<App />, document.getElementById('root'))