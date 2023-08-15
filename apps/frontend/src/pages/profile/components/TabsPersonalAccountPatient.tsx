import styles from '../styles/profile.module.css';

function TabsPersonalAccountPatient() {
  return (
    <div className={styles['content-top']}>
      <ul className={styles['content-nav']}>
        <li
          className={`${styles['content-nav-item']} ${styles['content-nav-item-active']}`}
        >
          <button
            className={`${styles['content-nav-btn']} ${styles['content-nav-btn-persdata']}`}
          >
            Личные данные
          </button>
        </li>
        <li className={styles['content-nav-item']}>
          <button
            className={`${styles['content-nav-btn']} ${styles['content-nav-btn-infovisit']}`}
          >
            Информация о записи
          </button>
        </li>
        <li className={styles['content-nav-item']}>
          <button
            className={`${styles['content-nav-btn']} ${styles['content-nav-btn-medicalhistory']}`}
          >
            Медицинская история
          </button>
        </li>
      </ul>

      <h3 className={styles['content-nav-title']}>Личный кабинет</h3>
    </div>
  );
}

export default TabsPersonalAccountPatient;
