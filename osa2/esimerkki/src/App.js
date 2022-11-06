import { useState, useEffect } from "react";

import Note from "./components/Note";
import noteService from "./services/notes";
import "./index.css";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [notes, setNotes] = useState([]);
  //Lisätään komponentille App tila newNote lomakkeen syötettä varten ja määritellään se input-komponentin attribuutin value arvoksi:
  const [newNote, setNewNote] = useState("");
  //state that keeps track of of notes to display
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    //noteService returns response.data from the promise returned by axios.get
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);
  //[] fetches only once when the component is rendered for the first time

  //Tapahtumankäsittelijä kutsuu heti tapahtuman metodia event.preventDefault() jolla se estää lomakkeen lähetyksen oletusarvoisen toiminnan, joka aiheuttaisi mm. sivun uudelleenlatautumisen.
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      //sisältökentän arvo saadaan komponentin tilasta newNote
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  //Jotta kontrolloidun syötekomponentin editoiminen olisi mahdollista, täytyy sille rekisteröidä tapahtumankäsittelijä, joka synkronoi syötekenttään tehdyt muutokset komponentin App tilaan:

  //Tapahtumaolion kenttä target vastaa nyt kontrolloitua input-kenttää ja event.target.value viittaa
  //inputin syötekentän arvoon.
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  //The items of the list depend on the state of the component

  /*
  The displayed notes (all versus important) are controlled with a button. 
  The event handler for the button is so simple that it has been defined directly
   in the attribute of the button element. 
   The event handler switches the value of showAll from true to false and vice versa:
  */
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    /*
The callback function sets the component's notes state to a new array that contains all 
the items from the previous notes array, except for the old note which is replaced 
by the updated version of it returned by the server:
*/
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        /*
Removing an already deleted note from the application's state is done with the array filter method, 
which returns a new array comprising only of the items from the list for which the function
 that was passed as a parameter returns true for:
*/
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  /*
 if note.id !== id is true; we simply copy the item from the old array into the new array. 
 If the condition is false, then the note object returned by the server is added to the 
 array instead.
*/

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
