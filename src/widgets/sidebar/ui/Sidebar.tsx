import { NavLink, Link, useMatch } from 'react-router';
import { useLogout } from '@/features/logout';
// Emoji from the mockup, exported from Figma, so the menu looks the same
// on every OS instead of using the system emoji font
import cardsIcon from '../assets/cards.svg';
import logoIcon from '../assets/logo.svg';
import logoutIcon from '../assets/logout.svg';
import ratesIcon from '../assets/rates.svg';
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
        <img src={logoIcon} alt="" width={24} height={24} />
      </Link>

      <nav className={styles.nav} aria-label="Main navigation">
        <NavLink to="/rates" className={getNavLinkClass}>
          <img
            className={styles.icon}
            src={ratesIcon}
            alt=""
            width={22}
            height={22}
          />
          <span className={styles.label}>Rates</span>
        </NavLink>
        {/* Plain Link: NavLink would set aria-current only on an exact
            /cards/new match, while the item is active on the whole section */}
        <Link
          to="/cards/new"
          className={getNavLinkClass({ isActive: isCardsSection })}
          aria-current={isCardsSection ? 'page' : undefined}
        >
          <img
            className={styles.icon}
            src={cardsIcon}
            alt=""
            width={22}
            height={22}
          />
          <span className={styles.label}>Cards</span>
        </Link>
      </nav>

      <div className={styles.logout}>
        <button type="button" className={styles.logoutBtn} onClick={logout}>
          <img
            className={styles.icon}
            src={logoutIcon}
            alt=""
            width={18}
            height={18}
          />
          <span className={styles.label}>Logout</span>
        </button>
      </div>
    </aside>
  );
};
