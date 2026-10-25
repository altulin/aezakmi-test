import { NavLink, Link } from 'react-router';
import { useLogout } from '@/features/logout';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  const logout = useLogout();

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
        <NavLink to="/cards/new" className={getNavLinkClass}>
          <span className={styles.icon} aria-hidden="true">
            📋
          </span>
          <span className={styles.label}>Cards</span>
        </NavLink>
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
