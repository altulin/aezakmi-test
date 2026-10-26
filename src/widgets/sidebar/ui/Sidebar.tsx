import { NavLink, Link, useMatch } from 'react-router';
import { useLogout } from '@/features/logout';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  const logout = useLogout();
  // The Cards item links to the form but stays active on the whole section,
  // including /cards/preview
  const isCardsSection = useMatch('/cards/*') !== null;

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${styles.navLink} ${isActive ? styles.active : ''}`;
  };

  return (
    <aside className={styles.sidebar}>
      <Link to="/rates" className={styles.logo} aria-label="Home">
        💰
      </Link>

      <nav className={styles.nav} aria-label="Main navigation">
        <NavLink to="/rates" className={getNavLinkClass}>
          <span className={styles.icon} aria-hidden="true">
            💱
          </span>
          <span className={styles.label}>Rates</span>
        </NavLink>
        {/* Plain Link: NavLink would set aria-current only on an exact
            /cards/new match, while the item is active on the whole section */}
        <Link
          to="/cards/new"
          className={getNavLinkClass({ isActive: isCardsSection })}
          aria-current={isCardsSection ? 'page' : undefined}
        >
          <span className={styles.icon} aria-hidden="true">
            📋
          </span>
          <span className={styles.label}>Cards</span>
        </Link>
      </nav>

      <div className={styles.logout}>
        <button type="button" className={styles.logoutBtn} onClick={logout}>
          <span className={styles.icon} aria-hidden="true">
            🚪
          </span>
          <span className={styles.label}>Logout</span>
        </button>
      </div>
    </aside>
  );
};
