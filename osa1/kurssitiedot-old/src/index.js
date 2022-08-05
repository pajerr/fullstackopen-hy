import React from 'react'
import ReactDOM from 'react-dom'

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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts[0]["name"]} excercies={course.parts[0]["exercises"]}/>             
      <Content part={course.parts[1]["name"]} excercies={course.parts[1]["exercises"]}/>    
      <Content part={course.parts[2]["name"]} excercies={course.parts[2]["exercises"]}/>
      <Total exercises1={course.parts[0]["exercises"]} exercises2={course.parts[1]["exercises"]} exercises3={course.parts[2]["exercises"]}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))