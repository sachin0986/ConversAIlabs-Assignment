import React, { useState } from 'react';

function AddNote({ onAddNote }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Don't submit if empty fields
    if (!title.trim() || !content.trim()) return;
    
    // Set submitting state to show spinner
    setIsSubmitting(true);
    
    // Create new note with timestamp ID
    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString()
    };
    
    // Add the note through parent callback
    // Using setTimeout to simulate a brief delay that shows the spinner
    setTimeout(() => {
      onAddNote(newNote);
      
      // Reset form
      setTitle('');
      setContent('');
      setIsSubmitting(false);
    }, 800); // Short delay to demonstrate spinner

    // // Why I chose useState + this submit handler - Using controlled inputs with useState gives direct access to form values and allows for validation before submission
  };
  
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          required
          placeholder="Note title"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2 font-medium">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border rounded-md h-32"
          required
          placeholder="Note content"
        />
      </div>
      
      <button 
        onClick={handleSubmit} 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300 flex items-center"
        disabled={!title.trim() || !content.trim() || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </>
        ) : (
          'Add Note'
        )}
      </button>
    </div>
  );
}