import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./styles.css";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  // Load notes from localStorage
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(storedNotes);
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);
  
  const addNote = (note) => {
    // Check for duplicate title
    if (notes.some((n) => n.title === note.title)) {
      alert("Title must be unique!");
      return;
    }
    setNotes([...notes, { id: uuidv4(), ...note }]);
  };

  const editNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Note-Taking App</h1>
      <input
        type="text"
        placeholder="Search notes..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <NoteForm addNote={addNote} editNote={editNote} editingNote={editingNote} />
      <NoteList notes={notes} editNote={setEditingNote} deleteNote={deleteNote} searchQuery={searchQuery} />
    </div>
  );
}
