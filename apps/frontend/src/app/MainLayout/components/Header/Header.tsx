import { useEffect, useState } from 'react';
import styles from '../../styles/header.module.css';
import axios from 'axios';

const navItems = ['Запись на приём', 'Список врачей', 'Контакты'];

function Header() {
  const [message, setMessage] = useState('Вы не авторизованы');
  const logout = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/user/logout/`,
        '',
        { withCredentials: true }
      );
      axios.defaults.headers.common['Authorization'] = ``;
      console.log('data', data);
      setMessage('Вы не авторизованы');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/user/`, {
          withCredentials: true,
        });
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
        </nav>
      </div>
      <div className={styles['header-rectangle']}></div>
    </header>
  );
}

export default Header;
