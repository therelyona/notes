const createNoteElement = (note) => {
  const li = document.createElement('li');
  li.className = 'note-card';

  const noteContentDiv = document.createElement('div');
  noteContentDiv.className = 'note-content';

  const dinoIcon = document.createElement('span');
  dinoIcon.className = 'dino-icon';
  dinoIcon.textContent = '🦖';

  const noteTextSpan = document.createElement('span');
  noteTextSpan.className = 'note-text';
  noteTextSpan.textContent = note.text;

  noteContentDiv.appendChild(dinoIcon);
  noteContentDiv.appendChild(noteTextSpan);

  const noteDetailsDiv = document.createElement('div');
  noteDetailsDiv.className = 'note-details';

  const tagSpan = document.createElement('span');
  tagSpan.className = 'tag';
  tagSpan.textContent = note.tags;

  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = '✏️';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = '❌';

  noteDetailsDiv.appendChild(tagSpan);
  noteDetailsDiv.appendChild(editBtn);
  noteDetailsDiv.appendChild(deleteBtn);

  li.appendChild(noteContentDiv);
  li.appendChild(noteDetailsDiv);

  return { li, editBtn, deleteBtn };
};

const displayNotes = (notes, elements) => {
  const { notesList } = elements;
  notesList.innerHTML = '';
  notes.forEach((note) => {
    const { li } = createNoteElement(note);
    notesList.appendChild(li);
  });
};

export default displayNotes;
