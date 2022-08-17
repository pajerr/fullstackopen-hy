import { useState } from "react";

function alreadyInPersons(persons, first, last) {
  //return first element of array that matches first and last, otherwise return false
  return persons.find(
    (person) => person.name.includes(first) && person.name.includes(last)
  );
}

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");

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
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  //tapahumankäsittelijämetodi saa parametrina tapahtumaolion event
  //tapahtumaolion target viittaa inputin syötekentään
  //value viittaa inputin syötekentän arvoon
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
      <h2>Phonebook</h2>
      <h2>Add new entry</h2>
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
      <h2>Filter</h2>
      <div>
        <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <div>
        <h2>Numbers</h2>
        <DisplayPersons persons={persons} filter={newFilter} />
      </div>
    </div>
  );
};

export default App;
