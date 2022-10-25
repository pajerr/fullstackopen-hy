import { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  //Lisätään komponentille App tila newNote lomakkeen syötettä varten ja määritellään se input-komponentin attribuutin value arvoksi:
  const [newNote, setNewNote] = useState("");
  //state that keeps track of of notes to display
  const [showAll, setShowAll] = useState(true);

  //Tapahtumankäsittelijä kutsuu heti tapahtuman metodia event.preventDefault() jolla se estää lomakkeen lähetyksen oletusarvoisen toiminnan, joka aiheuttaisi mm. sivun uudelleenlatautumisen.
  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);

    const noteObject = {
      //sisältökentän arvo saadaan komponentin tilasta newNote
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  //Jotta kontrolloidun syötekomponentin editoiminen olisi mahdollista, täytyy sille rekisteröidä tapahtumankäsittelijä, joka synkronoi syötekenttään tehdyt muutokset komponentin App tilaan:

  //Tapahtumaolion kenttä target vastaa nyt kontrolloitua input-kenttää ja event.target.value viittaa inputin syötekentän arvoon.
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  //The items of the list depend on the state of the component
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        {/*Lomakkeen input-komponentille on nyt rekisteröity tapahtumankäsittelijä
        tilanteeseen onChange:
        */}
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
