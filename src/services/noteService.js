const STORAGE_KEY = 'google-keep-clone-notes';

const readFromStorage = () => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Unable to read notes from local storage.', error);
    return [];
  }
};

const writeToStorage = (notes) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};

export async function getNotes() {
  return readFromStorage();
}

export async function createNote(note) {
  const notes = readFromStorage();
  const nextNotes = [note, ...notes];
  writeToStorage(nextNotes);
  return note;
}

export async function updateNote(id, note) {
  const notes = readFromStorage();
  const nextNotes = notes.map((item) => (item.id === id ? note : item));
  writeToStorage(nextNotes);
  return note;
}

export async function deleteNote(id) {
  const notes = readFromStorage();
  const nextNotes = notes.filter((note) => note.id !== id);
  writeToStorage(nextNotes);
  return nextNotes;
}

export async function deleteAllNotes() {
  writeToStorage([]);
  return [];
}
