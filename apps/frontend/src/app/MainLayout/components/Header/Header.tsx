import { useEffect, useState } from 'react';
import api from '../../../../infrastructure/api';
import styles from '../../styles/header.module.css';

function Header() {
  const [message, setMessage] = useState('Вы не авторизованы');
  const logout = async () => {
    try {
      await api.post( `user/logout`, '');
      api.defaults.headers.common['Authorization'] = '';
      localStorage.removeItem('refreshToken');
      setMessage('Вы не авторизованы');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/user`);
        setMessage(`${data.email}`);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [message]);
  return (
    <header className={styles['header']}>
      <div className={styles['header-wrap']}>
        <div className={styles['header-title']}>
          <h2 className={styles['header-title-medical']}>Medical</h2>
          <h2 className={styles['header-title-online']}>ONLINE</h2>
        </div>
        <nav className={styles['header-nav']}>
          <div className={styles['header-nav-profile']}>
            <h4>{message}</h4>
            <a href="/profile" style={{ textDecoration: 'none' }}>
              <img
                src="./assets/images/user.png"
                alt=""
                style={{ width: '25px', height: '25px' }}
              />
            </a>
            <button onClick={() => logout()}>Выход</button>
          </div>
          <ul className={styles['header-nav-list']}>
            <li className={styles['header-nav-item']}>
              <a href="/appointment" className={styles['header-nav-link']}>
                Запись на прием
              </a>
            </li>
            <li className={styles['header-nav-item']}>
              <a href="#" className={styles['header-nav-link']}>
                Список врачей
              </a>
            </li>
            <li className={styles['header-nav-item']}>
              <a href="#" className={styles['header-nav-link']}>
                Контакты
              </a>
            </li>
          </ul>
          <div className={styles['header-burger-menu']}></div>
        </nav>
      </div>
      <div className={styles['header-rectangle']}></div>
    </header>
  );
}

export default Header;
