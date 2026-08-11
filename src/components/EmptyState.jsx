import Icon from './Icon';

function EmptyState({ title, description }) {
  return (
    <div className="empty-state keep-empty-state">
      <span className="empty-icon"><Icon name="lightbulb" size={52} strokeWidth={1.2} /></span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default EmptyState;
