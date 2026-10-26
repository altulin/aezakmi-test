import { useState } from 'react';
import { NavLink, Link, useMatch } from 'react-router';
import { useLogout } from '@/features/logout';
import { loadFromStorage, saveToStorage } from '@/shared/lib/storage';
import { ConfirmDialog } from '@/shared/ui';
import cardsIcon from '../assets/cards.svg';
import logoIcon from '../assets/logo.svg';
import logoutIcon from '../assets/logout.svg';
import ratesIcon from '../assets/rates.svg';
import styles from './Sidebar.module.scss';

const EXPANDED_STORAGE_KEY = 'sidebar-expanded';

export const Sidebar = () => {
  const logout = useLogout();
  const isCardsSection = useMatch('/cards/*') !== null;
  const [isExpanded, setIsExpanded] = useState(
    () => loadFromStorage<boolean>(EXPANDED_STORAGE_KEY) ?? false
  );
  const [hasToggled, setHasToggled] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const toggleExpanded = () => {
    setHasToggled(true);
    setIsExpanded((prev) => {
      saveToStorage(EXPANDED_STORAGE_KEY, !prev);
      return !prev;
    });
  };

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return `${styles.navLink} ${isActive ? styles.active : ''}`;
  };

  return (
    <>
      <aside
        className={[
          styles.sidebar,
          isExpanded ? styles.expanded : '',
          hasToggled ? styles.animated : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <button
          type="button"
          className={styles.toggle}
          onClick={toggleExpanded}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
        >
          <img className={styles.logo} src={logoIcon} alt="" />
          <span className={styles.brand}>Dashboard</span>
        </button>

        <span className={styles.divider} aria-hidden="true" />
        <span className={styles.menuTitle} aria-hidden="true">
          Menu
        </span>

        <nav className={styles.nav} aria-label="Main navigation">
          <NavLink to="/rates" className={getNavLinkClass}>
            <img className={styles.icon} src={ratesIcon} alt="" />
            <span className={styles.label}>Rates</span>
            <span className={styles.labelLong}>Exchange Rates</span>
          </NavLink>
          <Link
            to="/cards/new"
            className={getNavLinkClass({ isActive: isCardsSection })}
            aria-current={isCardsSection ? 'page' : undefined}
          >
            <img className={styles.icon} src={cardsIcon} alt="" />
            <span className={styles.label}>Cards</span>
            <span className={styles.labelLong}>Kanban Cards</span>
          </Link>
        </nav>

        <div className={styles.logout}>
          <span className={styles.divider} aria-hidden="true" />
          <button
            type="button"
            className={styles.logoutBtn}
            onClick={() => setIsLogoutOpen(true)}
          >
            <img
              className={`${styles.icon} ${styles.logoutIcon}`}
              src={logoutIcon}
              alt=""
            />
            <span className={styles.label}>Logout</span>
            <span className={styles.labelLong}>Logout</span>
          </button>
        </div>
      </aside>

      <ConfirmDialog
        open={isLogoutOpen}
        title="Log out?"
        description="You will need to sign in again to see rates and cards."
        confirmLabel="Log out"
        onConfirm={logout}
        onCancel={() => setIsLogoutOpen(false)}
      />
    </>
  );
};
