import { useState } from "react";

function alreadyInPersons(persons, first, last) {
  //return first element of array that matches first and last, otherwise return false
  return persons.find(
    (person) => person.name.includes(first) && person.name.includes(last)
  );
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0401234567", id: 1 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
