import { useState, useEffect } from "react";

export default function NoteForm({ addNote, editNote, editingNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("others");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCategory(editingNote.category);
    }
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    const newNote = { title, content, category };
    if (editingNote) {
      editNote({ ...editingNote, ...newNote });
    } else {
      addNote(newNote);
    }
    
    setTitle("");
    setContent("");
    setCategory("others");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="ideas">Ideas</option>
        <option value="others">Others</option>
      </select>
      <button type="submit" className={editingNote ? "edit" : "add"}>
        {editingNote ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
}
