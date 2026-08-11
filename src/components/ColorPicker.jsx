import { useEffect, useRef } from 'react';
import Icon from './Icon';

function ColorPicker({ colors, value, onChange, onClose, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onClose?.();
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [onClose]);

  return (
    <div ref={ref} className={`color-popover ${className}`} role="dialog" aria-label="Note colors">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          className={`color-option ${value === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => { onChange(color); onClose?.(); }}
          aria-label={`Choose color ${color}`}
        >
          {value === color ? <Icon name="check" size={16} /> : null}
        </button>
      ))}
    </div>
  );
}

export default ColorPicker;
