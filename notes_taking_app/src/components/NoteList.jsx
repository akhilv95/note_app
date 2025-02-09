export default function NoteList({ notes, editNote, deleteNote, searchQuery }) {
    const filteredNotes = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className="note-list">
        {filteredNotes.length === 0 ? <p>No notes found</p> : null}
        {filteredNotes.map((note) => (
          <div key={note.id} className="note">
            <span className={`note-category category-${note.category}`}>{note.category}</span>
            <div className="note-title">{note.title}</div>
            <div className="note-content">{note.content}</div>
            <div className="note-buttons">
              <button className="edit" onClick={() => editNote(note)}>Edit</button>
              <button className="delete" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  