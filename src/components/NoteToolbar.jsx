import { useState } from 'react';
import Icon from './Icon';
import ColorPicker from './ColorPicker';

function NoteToolbar({ note, noteColors, onEdit, onCopy, onDelete, onColorChange }) {
  const [showColors, setShowColors] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="note-toolbar">
      <div className="note-toolbar-left">
        <button type="button" className="note-tool" onClick={() => onEdit(note)} aria-label="Edit note" title="Edit">
          <Icon name="edit" size={18} />
        </button>
        <button type="button" className="note-tool" onClick={() => onCopy(note)} aria-label="Make a copy" title="Make a copy">
          <Icon name="copy" size={18} />
        </button>
        <div className="toolbar-popover-wrap">
          <button type="button" className="note-tool" onClick={() => { setShowColors((v) => !v); setShowMore(false); }} aria-label="Change color" title="Change color">
            <Icon name="palette" size={18} />
          </button>
          {showColors ? (
            <ColorPicker colors={noteColors} value={note.color} onChange={(color) => onColorChange(note.id, color)} onClose={() => setShowColors(false)} />
          ) : null}
        </div>
        <button type="button" className="note-tool" aria-label="Add image" title="Add image (coming soon)">
          <Icon name="image" size={18} />
        </button>
        <button type="button" className="note-tool" aria-label="Set reminder" title="Reminder (coming soon)">
          <Icon name="bell" size={18} />
        </button>
        <div className="toolbar-popover-wrap">
          <button type="button" className="note-tool" onClick={() => { setShowMore((v) => !v); setShowColors(false); }} aria-label="More actions" title="More">
            <Icon name="more" size={18} />
          </button>
          {showMore ? (
            <div className="more-menu" role="menu">
              <button type="button" onClick={() => { setShowMore(false); onCopy(note); }}>Make a copy</button>
              <button type="button" onClick={() => { setShowMore(false); onDelete(note.id); }}>Delete note</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default NoteToolbar;
