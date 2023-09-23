import { useEffect, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { authStore } from '../../../../stores';
import { userStore } from '../../../../stores';
import api from '../../../../infrastructure/api';
import styles from '../../styles/header.module.css';

function Header() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const isAuth = authStore.isAuthorized;
        console.log(isAuth);
        setIsAuthorized(isAuth);
      } catch (error) {}
    })();
  });

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
              <a href="/appointment" className={styles['header-nav-link']}>
                Запись на прием
              </a>
            </li>
            <li className={styles['header-nav-item']}>
              <a href="/doctors" className={styles['header-nav-link']}>
                Список врачей
              </a>
            </li>
            <li className={styles['header-nav-item']}>
              <a href="/contacts" className={styles['header-nav-link']}>
                Контакты
              </a>
            </li>
            {isAuthorized ? (
              <>
                <a href="/profile/" className={styles['header-nav-link']}>
                  <img
                    style={{ width: '25px', height: 'auto' }}
                    src="./assets/images/user-logo.svg"
                    alt=""
                  />
                </a>
              </>
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
