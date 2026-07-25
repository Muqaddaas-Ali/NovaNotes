// Application State
let notes = [];

// DOM Elements
const noteForm = document.getElementById('note-form');
const noteTitleInput = document.getElementById('note-title');
const noteBodyInput = document.getElementById('note-body');
const notesGrid = document.getElementById('notes-grid');
const emptyState = document.getElementById('empty-state');
const notesCountSpan = document.getElementById('notes-count');
const searchInput = document.getElementById('search-input');

// Load notes from Local Storage when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const savedNotes = localStorage.getItem('nova_notes');
    if (savedNotes) {
        try {
            notes = JSON.parse(savedNotes);
        } catch (e) {
            console.error('Error parsing notes from local storage:', e);
            notes = [];
        }
    }
    renderNotes();
});

// Event Listener: Form Submission to Add a Note
noteForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent standard page reload

    const title = noteTitleInput.value.trim();
    const body = noteBodyInput.value.trim();
    
    // Get the selected color from the radio buttons
    const selectedColorRadio = document.querySelector('input[name="note-color"]:checked');
    const color = selectedColorRadio ? selectedColorRadio.value : '#fdf6e2';

    if (!title || !body) return; // Simple validation check

    // Create a new note object
    const newNote = {
        id: Date.now().toString(), // Simple unique ID based on timestamp
        title: title,
        body: body,
        color: color,
        date: new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    };

    // Add note to state and save
    notes.unshift(newNote); // Put the newest note first
    saveNotesToLocalStorage();
    
    // Reset Form
    noteForm.reset();
    
    // Select the first radio button as default color after form reset
    const defaultColorInput = document.querySelector('input[name="note-color"][value="#fdf6e2"]');
    if (defaultColorInput) {
        defaultColorInput.checked = true;
    }

    // Refresh UI
    renderNotes();
});

// Event Listener: Search input for filtering notes
searchInput.addEventListener('input', () => {
    renderNotes();
});

// Function to save current state to Local Storage
function saveNotesToLocalStorage() {
    localStorage.setItem('nova_notes', JSON.stringify(notes));
}

// Function to delete a note by ID
function deleteNote(noteId) {
    // Filter out the note with the matching ID
    notes = notes.filter(note => note.id !== noteId);
    saveNotesToLocalStorage();
    renderNotes();
}

// Function to render notes to the DOM
function renderNotes() {
    // Clear the current list (preserving empty state element if we need to show it)
    notesGrid.innerHTML = '';
    
    // Get search search query
    const searchQuery = searchInput.value.trim().toLowerCase();
    
    // Filter notes based on search query
    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(searchQuery) || 
               note.body.toLowerCase().includes(searchQuery);
    });

    // Update the counter
    notesCountSpan.textContent = notes.length;

    // Show empty state if there are no notes matching the search or in general
    if (filteredNotes.length === 0) {
        notesGrid.appendChild(emptyState);
        emptyState.style.display = 'flex';
        
        // Custom message if search yielded no results
        const emptyText = emptyState.querySelector('p');
        if (notes.length > 0) {
            emptyText.textContent = 'No matching notes found.';
        } else {
            emptyText.textContent = 'No notes yet. Write your first note above!';
        }
        return;
    }

    // Hide empty state if notes exist
    emptyState.style.display = 'none';

    // Loop through notes and construct DOM elements safely to prevent HTML injection
    filteredNotes.forEach(note => {
        const noteCard = document.createElement('article');
        noteCard.className = 'note-card';
        noteCard.style.setProperty('--note-bg', note.color);

        // Header Section of note card
        const noteHeader = document.createElement('div');
        noteHeader.className = 'note-header';

        const noteTitle = document.createElement('h3');
        noteTitle.className = 'note-title';
        noteTitle.textContent = note.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.title = 'Delete Note';
        // Elegant Trash Icon SVG
        deleteBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        `;
        deleteBtn.addEventListener('click', () => {
            deleteNote(note.id);
        });

        noteHeader.appendChild(noteTitle);
        noteHeader.appendChild(deleteBtn);

        // Body Section of note card
        const noteBody = document.createElement('p');
        noteBody.className = 'note-body';
        noteBody.textContent = note.body;

        // Footer Section of note card
        const noteFooter = document.createElement('div');
        noteFooter.className = 'note-footer';

        const noteDate = document.createElement('span');
        noteDate.className = 'note-date';
        noteDate.textContent = note.date;

        noteFooter.appendChild(noteDate);

        // Assemble Note Card
        noteCard.appendChild(noteHeader);
        noteCard.appendChild(noteBody);
        noteCard.appendChild(noteFooter);

        // Append to Grid
        notesGrid.appendChild(noteCard);
    });
}
