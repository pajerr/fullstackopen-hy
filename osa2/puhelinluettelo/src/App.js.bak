import { useState, useEffect } from "react";

import personService from "./services/persons.js";

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

const DisplayPersons = ({ persons, filter, handlePersonDelete }) => {
  //display all persons if filter is empty, otherwise filter persons
  if (filter.length === 0) {
    return (
      <div>
        <ul>
          {persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={() => handlePersonDelete(person.id)}>
                Delete person
              </button>
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
              <button onClick={() => handlePersonDelete(person.id)}>
                Delete person
              </button>
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
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
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

    // extract person from functions return value
    const person = alreadyInPersons(persons, first, last);
    // if person exists and returned from function
    if (person) {
      let result = window.confirm(
        `${first} ${last} is already added to phonebook, replace the old number with a new one?`
      );
      //if confirm yes to update number
      if (result === true) {
        //update number
        //person.id is from person returned from function
        //personObject is from form data that has new number
        personService
          .update(person.id, personObject.number)
          //updatedNumber is response from server
          .then((resUpdatedNumber) => {
            //create new personObject with updated number and use existing id
            const updatedPerson = {
              ...person,
              number: resUpdatedNumber.number,
            };
            setPersons(
              persons.map((personObject) =>
                personObject.id !== person.id ? personObject : updatedPerson
              )
            );
          });
        console.log("updated number...");
      } else {
        //do nothing
        console.log("dont update...");
      }
      //alert(`${first} ${last} is already added to phonebook`);
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
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

  const handlePersonDelete = (id) => {
    console.log(`delete person with id ${id}`);
    personService.remove(id);
    //need to update persons state and remove person with id that was deleted
    setPersons(persons.filter((person) => person.id !== id));
  };

  /*const personstoShow = showAll
    ? person
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
      <DisplayPersons
        persons={persons}
        filter={newFilter}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
