import styles from '../../styles/header.module.css';

const navItems = ['Запись на приём', 'Список врачей', 'Контакты'];

function Header() {
  return (
    <header className={styles['header']}>

      <div className={styles['header-wrap']}>
        <div className={styles['header-title']}>
          <h2 className={styles['header-title-medical']}>Medical</h2>
          <h2 className={styles['header-title-online']}>ONLINE</h2>
        </div>
        <nav className={styles['header-nav']}>
          <div className={styles['header-nav-profile']}>
            <img src="./assets/images/user.png" alt="" style={{width: '25px', height: '25px'}}/>
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
