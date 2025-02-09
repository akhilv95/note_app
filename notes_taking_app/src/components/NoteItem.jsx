export default function NoteItem({ note, editNote, deleteNote }) {
    return (
      <div className="bg-white p-3 mt-2 rounded-lg shadow flex justify-between items-center">
        <div>
          <h3 className="font-bold">{note.title}</h3>
          <p>{note.content}</p>
          <span className="text-sm text-gray-500">Category: {note.category}</span>
        </div>
        <div>
          <button className="text-blue-500 mr-2" onClick={() => editNote(note)}>Edit</button>
          <button className="text-red-500" onClick={() => deleteNote(note.id)}>Delete</button>
        </div>
      </div>
    );
  }
  