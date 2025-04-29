import { useState } from 'react';

// Notes List Component
function NotesList({ notes, onDeleteNote }) {
  const [deletingId, setDeletingId] = useState(null);
  
  // Handle delete with confirmation
  const handleDelete = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setDeletingId(noteId);
      // Add small delay to show the deleting state
      setTimeout(() => {
        onDeleteNote(noteId);
        setDeletingId(null);
      }, 500);
    }
  };
  
  if (notes.length === 0) {
    return <p className="text-gray-500 text-center py-8">No notes yet. Add your first note!</p>;
  }
  
  return (
    <div className="space-y-4">
      {notes.map(note => (
        <div key={note.id} className="border rounded-md p-4 hover:bg-gray-50 relative">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
            <button 
              onClick={() => handleDelete(note.id)}
              className="text-red-500 hover:text-red-700 ml-2"
              disabled={deletingId === note.id}
            >
              {deletingId === note.id ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-gray-600">
            {note.content.length > 100 
              ? `${note.content.substring(0, 100)}...` 
              : note.content}
          </p>
          <div className="mt-2 text-sm text-gray-400">
            {new Date(note.createdAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;