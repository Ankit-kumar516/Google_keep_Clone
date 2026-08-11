import { useCallback, useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import EmptyState from './components/EmptyState';
import ConfirmModal from './components/ConfirmModal';
import { createNote, deleteAllNotes, deleteNote, getNotes, updateNote } from './services/noteService';
import { formatDate, generateId } from './utils/dateUtils';

const noteColors = ['#ffffff', '#f28b82', '#fbbc04', '#fff475', '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa', '#d7aefb', '#fdcfe8'];

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [confirmState, setConfirmState] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('notes');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const loadNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      setNotes(await getNotes());
    } catch (error) {
      setMessage(error.message || 'Unable to load notes right now.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { loadNotes(); }, [loadNotes]);

  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(() => setMessage(''), 2400);
    return () => window.clearTimeout(timer);
  }, [message]);

  const filteredNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return notes;
    return notes.filter((note) =>
      (note.title || '').toLowerCase().includes(query) ||
      (note.description || '').toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);

  const closeComposer = () => {
    setIsComposerOpen(false);
    setEditingNote(null);
  };

  const handleSubmit = async ({ title, description, color }) => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    if (!trimmedTitle && !trimmedDescription) {
      setMessage('Please add a title or description before saving.');
      return;
    }

    try {
      if (editingNote) {
        const updatedNote = await updateNote(editingNote.id, {
          ...editingNote,
          title: trimmedTitle,
          description: trimmedDescription,
          color,
          updatedAt: new Date().toISOString()
        });
        setNotes((prev) => prev.map((item) => item.id === updatedNote.id ? updatedNote : item));
        setMessage('Note updated');
      } else {
        const now = new Date().toISOString();
        const createdNote = await createNote({
          id: generateId(),
          title: trimmedTitle,
          description: trimmedDescription,
          color,
          createdAt: now,
          updatedAt: now
        });
        setNotes((prev) => [createdNote, ...prev]);
        setMessage('Note created');
      }
      closeComposer();
    } catch (error) {
      setMessage(error.message || 'Something went wrong while saving the note.');
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsComposerOpen(true);
    setActiveSection('notes');
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes((prev) => prev.filter((note) => note.id !== noteId));
      setMessage('Note deleted');
    } catch (error) {
      setMessage(error.message || 'Unable to delete the note.');
    } finally {
      setConfirmState(null);
    }
  };

  const handleCopy = async (note) => {
    try {
      const now = new Date().toISOString();
      const createdNote = await createNote({ ...note, id: generateId(), createdAt: now, updatedAt: now });
      setNotes((prev) => [createdNote, ...prev]);
      setMessage('Note copied');
    } catch (error) {
      setMessage(error.message || 'Unable to copy the note.');
    }
  };

  const handleColorChange = async (noteId, color) => {
    const note = notes.find((item) => item.id === noteId);
    if (!note) return;
    try {
      const updatedNote = await updateNote(note.id, { ...note, color, updatedAt: new Date().toISOString() });
      setNotes((prev) => prev.map((item) => item.id === updatedNote.id ? updatedNote : item));
    } catch (error) {
      setMessage(error.message || 'Unable to update the color.');
    }
  };

  const confirmDelete = (noteId) => setConfirmState({
    title: 'Delete note?',
    message: 'This note will be removed permanently.',
    confirmLabel: 'Delete',
    onConfirm: () => handleDelete(noteId)
  });

  const confirmClearAll = () => setConfirmState({
    title: 'Clear all notes?',
    message: 'This will remove every note from this account.',
    confirmLabel: 'Clear all',
    onConfirm: async () => {
      try {
        await deleteAllNotes();
        setNotes([]);
        setMessage('All notes cleared');
      } catch (error) {
        setMessage(error.message || 'Unable to clear notes.');
      } finally {
        setConfirmState(null);
      }
    }
  });

  const openNewNote = () => {
    setEditingNote(null);
    setIsComposerOpen(true);
    setActiveSection('notes');
  };

  const sectionTitle = activeSection === 'notes' ? 'Notes' : activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
  const isNotesSection = activeSection === 'notes';

  return (
    <div className="app-layout">
      <Header
        onMenuToggle={() => setSidebarCollapsed((value) => !value)}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewToggle={() => setViewMode((value) => value === 'grid' ? 'list' : 'grid')}
        onRefresh={loadNotes}
      />

      <div className="workspace">
        <Sidebar collapsed={sidebarCollapsed} activeSection={activeSection} onSectionChange={setActiveSection} />

        <main className="content">
          <div className="content-inner">
            {message ? <div className="toast" role="status">{message}</div> : null}

            {isNotesSection ? (
              <>
                <NoteForm
                  isOpen={isComposerOpen}
                  editingNote={editingNote}
                  onOpen={openNewNote}
                  onClose={closeComposer}
                  onSubmit={handleSubmit}
                  noteColors={noteColors}
                />

                {isLoading ? (
                  <div className="loading-state">Loading notes...</div>
                ) : filteredNotes.length === 0 ? (
                  <EmptyState
                    title={notes.length === 0 ? 'Notes you add appear here' : 'No matching notes found'}
                    description={notes.length === 0 ? 'Capture an idea, list, or reminder to get started.' : 'Try a different search term.'}
                  />
                ) : (
                  <NotesList
                    notes={filteredNotes}
                    onEdit={handleEdit}
                    onDelete={confirmDelete}
                    onCopy={handleCopy}
                    onColorChange={handleColorChange}
                    formatDate={formatDate}
                    noteColors={noteColors}
                    viewMode={viewMode}
                  />
                )}
              </>
            ) : (
              <div className="section-placeholder">
                <h1>{sectionTitle}</h1>
                <p>This section is ready for the next backend/data phase.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <button className="clear-all-fab" type="button" onClick={confirmClearAll} aria-label="Clear all notes" title="Clear all notes">
        Clear all
      </button>

      <ConfirmModal
        isOpen={Boolean(confirmState)}
        title={confirmState?.title || ''}
        message={confirmState?.message || ''}
        confirmLabel={confirmState?.confirmLabel || 'Confirm'}
        onCancel={() => setConfirmState(null)}
        onConfirm={confirmState?.onConfirm || (() => {})}
      />
    </div>
  );
}

export default App;
