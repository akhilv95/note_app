import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  const addNote = () => {
    if (input.trim()) {
      setNotes([...notes, { id: uuidv4(), text: input }]);
      setInput("");
    }
  };

  const editNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setInput(noteToEdit.text);
    setEditingId(id);
  };

  const updateNote = () => {
    setNotes(notes.map((note) => (note.id === editingId ? { ...note, text: input } : note)));
    setInput("");
    setEditingId(null);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">📝 Note-Taking App</h1>
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          className="w-full p-2 border rounded-lg"
          placeholder="Enter a note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="w-full mt-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={editingId ? updateNote : addNote}
        >
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>
      <div className="w-full max-w-md mt-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-3 mt-2 rounded-lg shadow flex justify-between items-center">
            <span>{note.text}</span>
            <div>
              <button className="text-blue-500 mr-2" onClick={() => editNote(note.id)}>Edit</button>
              <button className="text-red-500" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
