import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/Persons";

function alreadyInPersons(persons, first, last) {
  //return first element of array that matches first and last, otherwise return false
  return persons.find(
    (person) => person.name.includes(first) && person.name.includes(last)
  );
}

const NewEntry = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const DisplayPersons = ({ persons, filter }) => {
  if (filter.length === 0) {
    return (
      <div>
        <ul>
          {persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div>
        <ul>
          {filteredPersons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");

  useEffect(() => {
    //console.log("effect");
    //axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    let [first, last] = personObject.name.split(" ");

    if (alreadyInPersons(persons, first, last)) {
      alert(`${first} ${last} is already added to phonebook`);
    } else {
      axios
        .post("http://localhost:3001/persons", personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
        });

      // setPersons(persons.concat(personObject));
      // setNewName("");
      // setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  /*const personstoShow = showAll
    ? persons
    : persons.filter((person) => person.includes(filter));*/

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add new entry</h2>
      <NewEntry
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Filter</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} filter={newFilter} />
    </div>
  );
};

export default App;
