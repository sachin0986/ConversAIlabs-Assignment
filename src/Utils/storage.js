// Constants for localStorage keys
const NOTES_STORAGE_KEY = 'notesApp_notes';

/**
 * Save a note to localStorage
 * 
 * @param {Object} note - The note object to save
 * @throws {Error} If localStorage is not available or quota is exceeded
 */
export const saveNote = (note) => {
  try {
    // Get existing notes
    const notes = getNotes();
    
    // Add the new note
    notes.push(note);
    
    // Save back to localStorage
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving note to localStorage:', error);
    throw new Error('Failed to save note to storage');
  }
};

/**
 * Get all notes from localStorage
 * 
 * @returns {Array} Array of note objects
 * @throws {Error} If localStorage is not available
 */
export const getNotes = () => {
  try {
    const notesJson = localStorage.getItem(NOTES_STORAGE_KEY);
    return notesJson ? JSON.parse(notesJson) : [];
  } catch (error) {
    console.error('Error getting notes from localStorage:', error);
    throw new Error('Failed to retrieve notes from storage');
  }
};

/**
 * Delete a note by ID
 * 
 * @param {string|number} noteId - The ID of the note to delete
 * @throws {Error} If localStorage is not available
 */
export const deleteNote = (noteId) => {
  try {
    const notes = getNotes();
    const filteredNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(filteredNotes));
  } catch (error) {
    console.error('Error deleting note from localStorage:', error);
    throw new Error('Failed to delete note from storage');
  }
};

/**
 * Clear all notes from storage
 * 
 * @throws {Error} If localStorage is not available
 */
export const clearNotes = () => {
  try {
    localStorage.removeItem(NOTES_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing notes from localStorage:', error);
    throw new Error('Failed to clear notes from storage');
  }
};