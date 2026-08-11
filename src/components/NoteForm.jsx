import { useEffect, useState } from 'react';
import Icon from './Icon';
import ColorPicker from './ColorPicker';

function NoteForm({ isOpen, editingNote, onOpen, onClose, onSubmit, noteColors }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(noteColors[0]);
  const [showColors, setShowColors] = useState(false);

  useEffect(() => {
    setTitle(editingNote?.title || '');
    setDescription(editingNote?.description || '');
    setColor(editingNote?.color || noteColors[0]);
    setShowColors(false);
  }, [editingNote, noteColors]);

  if (!isOpen) {
  return (
    <div
      className="composer-card collapsed"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <span className="composer-placeholder">
        Take a note...
      </span>

      <div
        className="composer-icons"
        onClick={(event) => event.stopPropagation()}
      >
        {/* New list */}
        <button
          type="button"
          className="composer-quick-action"
          onClick={onOpen}
          aria-label="New list"
          title="New list"
          data-tooltip="New list"
        >
          <Icon name="checkSquare" size={21} />
        </button>

        {/* New note with drawing */}
        <button
          type="button"
          className="composer-quick-action"
          onClick={onOpen}
          aria-label="New note with drawing"
          title="New note with drawing"
          data-tooltip="New note with drawing"
        >
          <Icon name="draw" size={21} />
        </button>

        {/* New note with image */}
        <button
          type="button"
          className="composer-quick-action"
          onClick={onOpen}
          aria-label="New note with image"
          title="New note with image"
          data-tooltip="New note with image"
        >
          <Icon name="image" size={21} />
        </button>
      </div>
    </div>
  );
}

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, description, color });
  };

  return (
    <form className="composer-card expanded" onSubmit={handleSubmit} style={{ backgroundColor: color }}>
      <div className="composer-top">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          autoFocus={!editingNote}
          aria-label="Note title"
        />
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close note editor" title="Close">
          <Icon name="x" />
        </button>
      </div>

      <textarea
        rows="4"
        placeholder="Take a note..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        aria-label="Note description"
      />

      <div className="composer-bottom">
        <div className="composer-tools">
          <div className="toolbar-popover-wrap">
            <button type="button" className="icon-button" onClick={() => setShowColors((v) => !v)} aria-label="Change note color" title="Background color">
              <Icon name="palette" size={19} />
            </button>
            {showColors ? <ColorPicker colors={noteColors} value={color} onChange={setColor} onClose={() => setShowColors(false)} /> : null}
          </div>
          <button type="button" className="icon-button" aria-label="Add reminder" title="Reminder (coming soon)"><Icon name="bell" size={19} /></button>
          <button type="button" className="icon-button" aria-label="Add image" title="Image (coming soon)"><Icon name="image" size={19} /></button>
        </div>
        <button type="submit" className="close-composer">{editingNote ? 'Save' : 'Close'}</button>
      </div>
    </form>
  );
}

export default NoteForm;
