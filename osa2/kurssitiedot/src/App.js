const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ text, text2, parts }) => {
  let totalExcercies = parts.reduce(function (sum, part) {
    return sum + part.exercises;
  }, 0);
  return (
    <div>
      {text} {totalExcercies} {text2}
    </div>
  );
};

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
);

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map((parts) => (
          <Part key={parts.id} part={parts} />
        ))}
      </ul>
      <Total text="total of" parts={parts} text2="excercises" />
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
