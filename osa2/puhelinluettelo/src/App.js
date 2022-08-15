import { useState } from "react";

function alreadyInPersons(persons, first, last) {
  //return first element of array that matches first and last, otherwise return false
  return persons.find(
    (person) => person.name.includes(first) && person.name.includes(last)
  );
}

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      id: persons.length + 1,
    };

    let [first, last] = nameObject.name.split(" ");

    if (alreadyInPersons(persons, first, last)) {
      alert(`${first} ${last} is already added to phonebook`);
    } else {
      setPersons(persons.concat(nameObject));
      setNewName("");
    }
  };

  //tapahumankäsittelijämetodi saa parametrina tapahtumaolion event
  //tapahtumaolion target viittaa inputin syötekentään
  //value viittaa inputin syötekentän arvoon
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      {/* <div>new name debug: {newName}</div> */}
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
