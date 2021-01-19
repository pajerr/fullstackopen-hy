import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => { 
  return (
    <div>
        <h1>
          {course.name}       
        </h1>
      </div>
  )
}

const Content = ({ course }) => {
  return (
    <li>{course.name}: {course.exercises}</li>
  )
}

//lähetetään course.parts array suoraan contentille ja otetaan avaimeksi course.parts.id
const Course = ({ course }) => {
  return (
    <div>
      <Header key={course.id} course={course} />
      <ul>
      {course.parts.map((x) => 
        <Content key={x.id} course={x} />
      )}
      </ul>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


