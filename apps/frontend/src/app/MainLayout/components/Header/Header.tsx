import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { authStore } from 'apps/frontend/src/stores';
import styles from '../../styles/header.module.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className={styles['header']}>
      <div className={styles['header-wrap']}>
        <div
          className={styles['header-title']}
          onClick={() => {
            navigate('/');
          }}
        >
          <h2 className={styles['header-title-medical']}>Medical</h2>
          <h2 className={styles['header-title-online']}>ONLINE</h2>
        </div>
        <nav className={styles['header-nav']}>
          <ul className={styles['header-nav-list']}>
            <li className={styles['header-nav-item']}>
              <Link to="/appointment" className={styles['header-nav-link']}>
                Запись на прием
              </Link>
            </li>
            <li className={styles['header-nav-item']}>
              <Link to="/doctors" className={styles['header-nav-link']}>
                Список врачей
              </Link>
            </li>
            <li className={styles['header-nav-item']}>
              <Link to="/contacts" className={styles['header-nav-link']}>
                Контакты
              </Link>
            </li>
            {authStore.userIsAuthorized ? (
              <Link to="/profile/" className={styles['header-nav-link']}>
                <img
                  style={{ width: '25px', height: 'auto' }}
                  src="./assets/images/user-logo.svg"
                  alt=""
                />
              </Link>
            ) : (
              ''
            )}
          </ul>
          <div className={styles['header-burger-menu']}></div>
        </nav>
      </div>
      <div className={styles['header-rectangle']}></div>
    </header>
  );
}

export default observer(Header);
