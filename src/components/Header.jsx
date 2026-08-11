import SearchBar from './SearchBar';
import Icon from './Icon';

function Header({
  onMenuToggle,
  searchValue,
  onSearchChange,
  viewMode,
  onViewToggle,
  onRefresh
}) {
  return (
    <header className="app-header">

      {/* LEFT */}
      <div className="header-left">

        <button
          type="button"
          className="header-menu-button"
          onClick={onMenuToggle}
          aria-label="Main menu"
          title="Main menu"
        >
          <Icon name="menu" size={24} strokeWidth={2} />
        </button>

        <div className="keep-brand">
          <div className="keep-logo" aria-hidden="true">
            <div className="keep-logo-bulb">
              <div className="keep-logo-glow"></div>
            </div>
            <div className="keep-logo-base"></div>
          </div>

          <span className="keep-wordmark">
            Keep
          </span>
        </div>

      </div>


      {/* SEARCH */}
      <div className="header-search">
        <SearchBar
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>


      {/* RIGHT */}
      <div className="header-actions">

        <button
          type="button"
          className="header-action-button"
          onClick={onRefresh}
          aria-label="Refresh"
          title="Refresh"
        >
          <Icon name="refresh" size={24} strokeWidth={1.9} />
        </button>


        <button
          type="button"
          className="header-action-button"
          onClick={onViewToggle}
          aria-label={
            viewMode === 'grid'
              ? 'List view'
              : 'Grid view'
          }
          title={
            viewMode === 'grid'
              ? 'List view'
              : 'Grid view'
          }
        >
          <Icon
            name={viewMode === 'grid' ? 'list' : 'grid'}
            size={24}
            strokeWidth={1.9}
          />
        </button>


        <button
          type="button"
          className="header-action-button"
          aria-label="Settings"
          title="Settings"
        >
          <Icon
            name="settings"
            size={24}
            strokeWidth={1.8}
          />
        </button>


        <button
          type="button"
          className="header-action-button"
          aria-label="Google apps"
          title="Google apps"
        >
          <Icon
            name="apps"
            size={25}
            strokeWidth={1.8}
          />
        </button>


        {/* Keep existing authentication placeholder.
            Do NOT add organization branding here. */}
        <button
          type="button"
          className="account-button"
          aria-label="Google Account"
          title="Google Account"
        >
          <span className="account-avatar">A</span>
        </button>

      </div>

    </header>
  );
}

export default Header;