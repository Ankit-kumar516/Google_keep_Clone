import NoteCard from './NoteCard';

function NotesList({ notes, onEdit, onDelete, onCopy, onColorChange, formatDate, noteColors, viewMode }) {
  return (
    <div className={`notes-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopy={onCopy}
          onColorChange={onColorChange}
          formatDate={formatDate}
          noteColors={noteColors}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}

export default NotesList;
