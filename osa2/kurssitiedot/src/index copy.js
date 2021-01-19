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

//valmiiksi jo syötetty parts array joten ei tarvi .parts käyttää tässä komponentissa enää
const Content = ( {course} ) => {
  return (
    <ul>
      {course.map((x) => 
      <li>{x.name}: {x.exercises}</li>)}
    </ul>
  )    
}

const Course = ({ course }) => {
  //const courseinfo = course.parts.map((x.parts, i) => x.parts.name);
  //console.log(courseinfo)
  return (
    <div>
      <Header key={course.name} course={course} />    
      <Content key={course.parts.exercises} course={course.parts} />
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


