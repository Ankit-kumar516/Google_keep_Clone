import { useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import Icon from './Icon';

function Header({
  onMenuToggle,
  searchValue,
  onSearchChange,
  viewMode,
  onViewToggle,
  onRefresh,
  user,
  onLogout
}) {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    if (!isAccountMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!accountRef.current?.contains(event.target)) {
        setIsAccountMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsAccountMenuOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAccountMenuOpen]);

  const displayName = user?.displayName || 'Google Account';
  const initial = (user?.displayName || user?.email || 'A').charAt(0).toUpperCase();

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


        <div className="account-menu-wrapper" ref={accountRef}>
          <button
            type="button"
            className="account-button"
            aria-label={displayName}
            title={displayName}
            aria-haspopup="menu"
            aria-expanded={isAccountMenuOpen}
            onClick={() => setIsAccountMenuOpen((value) => !value)}
          >
            {user?.photoURL ? (
              <img className="account-photo" src={user.photoURL} alt="" referrerPolicy="no-referrer" />
            ) : (
              <span className="account-avatar">{initial}</span>
            )}
          </button>

          {isAccountMenuOpen ? (
            <div className="account-menu" role="menu">
              <div className="account-menu-header">
                {user?.photoURL ? (
                  <img className="account-menu-photo" src={user.photoURL} alt="" referrerPolicy="no-referrer" />
                ) : (
                  <span className="account-avatar account-avatar-large">{initial}</span>
                )}
                <div className="account-menu-identity">
                  <span className="account-menu-name">{displayName}</span>
                  <span className="account-menu-email">{user?.email}</span>
                </div>
              </div>

              <button
                type="button"
                className="account-menu-action"
                role="menuitem"
                onClick={() => {
                  setIsAccountMenuOpen(false);
                  onLogout?.();
                }}
              >
                Sign out
              </button>
            </div>
          ) : null}
        </div>

      </div>

    </header>
  );
}

export default Header;