import NoteToolbar from './NoteToolbar';

function NoteCard({ note, onEdit, onDelete, onCopy, onColorChange, noteColors, formatDate, viewMode }) {
  return (
    <article className={`note-card ${viewMode === 'list' ? 'list-note' : ''}`} style={{ backgroundColor: note.color }}>
      <button type="button" className="note-main" onDoubleClick={() => onEdit(note)} aria-label={`Open note ${note.title || 'Untitled'}`}>
        {note.title ? <h3>{note.title}</h3> : null}
        {note.description ? <p>{note.description}</p> : null}
        <div className="note-meta">
          <span>{formatDate(note.updatedAt)}</span>
        </div>
      </button>
      <NoteToolbar
        note={note}
        noteColors={noteColors}
        onEdit={onEdit}
        onDelete={onDelete}
        onCopy={onCopy}
        onColorChange={onColorChange}
      />
    </article>
  );
}

export default NoteCard;
