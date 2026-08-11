import Icon from './Icon';

function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar" htmlFor="note-search">
      <Icon name="search" size={21} />
      <input
        id="note-search"
        type="search"
        placeholder="Search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search notes"
      />
      {value ? (
        <button type="button" className="search-clear" onClick={() => onChange('')} aria-label="Clear search">
          <Icon name="x" size={19} />
        </button>
      ) : null}
    </label>
  );
}

export default SearchBar;
