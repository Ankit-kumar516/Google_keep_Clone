import Icon from './Icon';

const items = [
  { id: 'notes', label: 'Notes', icon: 'lightbulb' },
  { id: 'reminders', label: 'Reminders', icon: 'bell' },
  { id: 'labels', label: 'Edit labels', icon: 'tag' },
  { id: 'archive', label: 'Archive', icon: 'archive' },
  { id: 'trash', label: 'Trash', icon: 'trash' }
];

function Sidebar({ collapsed, activeSection, onSectionChange }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Primary navigation">
      <nav>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
            aria-current={activeSection === item.id ? 'page' : undefined}
            title={collapsed ? item.label : undefined}
          >
            <span className="sidebar-icon"><Icon name={item.icon} size={21} /></span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
