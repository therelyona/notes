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

const editNote = (index) => {
  elements.noteText.value = notes[index].text;
  elements.noteTags.value = notes[index].tags;
  editIndex = index;
};

const deleteNote = (index) => {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  displayNotes(notes, elements, editNote, deleteNote);
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
  displayNotes(notes, elements, editNote, deleteNote);
  elements.noteText.value = '';
  elements.noteTags.value = '';
  editIndex = null;
});

elements.searchInput.addEventListener('input', () => {
  const searchTerm = elements.searchInput.value.toLowerCase();
  const filteredNotes = notes.filter((note) => note.text.toLowerCase().includes(searchTerm)
    || note.tags.toLowerCase().includes(searchTerm));

  displayNotes(filteredNotes, elements, editNote, deleteNote);
});

displayNotes(notes, elements, editNote, deleteNote);
