import displayNotes from './view.js';

const notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = null;

const elements = {
  notesList: document.getElementById('notesList'),
  noteText: document.getElementById('noteText'),
  noteTags: document.getElementById('noteTags'),
  saveNote: document.getElementById('saveNote'),
  searchInput: document.getElementById('searchInput'),
};

const deleteNote = (index) => {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  updateDisplay();
};

const editNote = (index) => {
  elements.noteText.value = notes[index].text;
  elements.noteTags.value = notes[index].tags;
  editIndex = index;
};

const updateDisplay = () => {
  displayNotes(notes, elements);
  notes.forEach((_, index) => {
    const noteElements = elements.notesList.children[index];
    const editBtn = noteElements.querySelector('.edit-btn');
    const deleteBtn = noteElements.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => editNote(index));
    deleteBtn.addEventListener('click', () => deleteNote(index));
  });
};

elements.saveNote.addEventListener('click', () => {
  const text = elements.noteText.value.trim();
  const tags = elements.noteTags.value.trim();

  if (text === '') return;

  if (editIndex !== null) {
    notes[editIndex] = { text, tags };
  } else {
    notes.push({ text, tags });
  }

  localStorage.setItem('notes', JSON.stringify(notes));
  updateDisplay();
  elements.noteText.value = '';
  elements.noteTags.value = '';
  editIndex = null;
});

elements.searchInput.addEventListener('input', () => {
  const searchTerm = elements.searchInput.value.toLowerCase();
  const filteredNotes = notes.filter((note) => note.text.toLowerCase().includes(searchTerm)
    || note.tags.toLowerCase().includes(searchTerm));

  displayNotes(filteredNotes, elements);
});

updateDisplay();
