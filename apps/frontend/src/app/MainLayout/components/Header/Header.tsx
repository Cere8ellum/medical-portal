import { useEffect, useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { authStore } from '../../../../stores';
import { userStore } from '../../../../stores';
import api from '../../../../infrastructure/api';
import styles from '../../styles/header.module.css';

function Header() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const logout = async (e: MouseEvent) => {
    if (e !== undefined) {
      e.preventDefault();
      try {
        await authStore.logout();
        setMessage('');
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('refreshToken');
    if (isAuth !== '' && isAuth) {
      (async () => {
        try {
          const { data } = await api.get(`/user`);
          setMessage(`${data.email}`);
          userStore.userIdSet(data.id);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [message]);
  return (
    <header className={styles['header']}>
      <div className={styles['header-wrap']}>
        <div className={styles['header-title']}>
          <a href="/" className={styles['header-title-medical']}>
            Medical
          </a>
          <a href="/" className={styles['header-title-online']}>
            ONLINE
          </a>
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
            {message ? (
              <>
                <li className={styles['header-nav-item']}>
                  <a href="/profile/" className={styles['header-nav-link']}>
                    <img
                      style={{ width: '25px', height: 'auto' }}
                      src="./assets/images/user-logo.svg"
                      alt=""
                    />
                  </a>
                </li>
                <li>{message}</li>
                <li className={styles['header-nav-item']}>
                  <a
                    href="/"
                    className={styles['header-nav-link']}
                    onClick={(e) => logout(e)}
                  >
                    <img
                      style={{ width: '25px', height: 'auto' }}
                      src="./assets/images/user-logout.svg"
                      alt=""
                    />
                  </a>
                </li>
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
