import { useState, useEffect } from 'react';
import { saveNote, getNotes, clearNotes, deleteNote } from './Utils/storage';
import AddNote from './Components/AddNote';
import NotesList from './Components/NotesList';

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState('add'); // Default to add notes tab
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const storedNotes = getNotes();
      setNotes(storedNotes);
    } catch (err) {
      setError('Failed to load notes from storage');
    }
  }, []);

  // Handle adding a new note
  const handleAddNote = (newNote) => {
    // Note: We're not setting isLoading here anymore since the AddNote component
    // now handles its own loading state for a better UX at the button level
    try {
      const updatedNotes = [...notes, newNote];
      saveNote(newNote);
      setNotes(updatedNotes);
      setError(null);
    } catch (err) {
      setError('Failed to save note to storage');
    }
  };
  
  // Handle deleting a note
  const handleDeleteNote = (noteId) => {
    setIsLoading(true);
    try {
      deleteNote(noteId);
      setNotes(notes.filter(note => note.id !== noteId));
      setError(null);
    } catch (err) {
      setError('Failed to delete note from storage');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Notes App</h1>
      
      {/* Error Banner */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
          {/* // Why display error banner - Immediate visual feedback for storage failures helps users understand why their notes aren't being saved */}
        </div>
      )}
      
      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </div>
          {/* // Why show spinner here - Visual indication that storage operations are in progress prevents user frustration when there's a delay in saving */}
        </div>
      )}
      
      {/* Navigation */}
      <div className="flex mb-6">
        <button 
          className={`px-4 py-2 rounded-t-lg ${activeTab === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('add')}
        >
          Add Note
        </button>
        <button 
          className={`px-4 py-2 ml-2 rounded-t-lg ${activeTab === 'view' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('view')}
        >
          View Notes ({notes.length})
        </button>
        {/* // Why this nav approach for simplicity - Using tabs for clear context switching with minimal code while keeping both views in the same component tree */}
      </div>
      
      {/* Content based on active tab */}
      <div className="bg-white p-6 rounded shadow-md">
        {activeTab === 'add' ? (
          <AddNote onAddNote={handleAddNote} />
        ) : (
          <NotesList notes={notes} onDeleteNote={handleDeleteNote} />
        )}
      </div>
    </div>
  );
}