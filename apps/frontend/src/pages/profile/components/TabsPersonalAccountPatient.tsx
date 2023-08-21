import { useState, useEffect } from 'react';
import styles from '../styles/profile.module.scss';

let idx = 1;
function TabsPersonalAccountPatient() {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index: number) => {
    setActiveIndex(index);
    idx = index;
    return index;
  };
  const checkActive = (index: number, className: string) =>
    activeIndex === index ? className : '';

  return {
    idx,
    Tabs: (
      <div className={styles['content-top']}>
        <ul className={styles['content-nav']}>
          <li
            className={`${styles['content-nav-item']} ${checkActive(
              1,
              styles['active']
            )}`}
            onClick={() => handleClick(1)}
          >
            <button
              className={`${styles['content-nav-btn']} ${styles['content-nav-btn-persdata']}`}
            >
              Личные данные
            </button>
          </li>
          <li
            className={`${styles['content-nav-item']} ${checkActive(
              2,
              styles['active']
            )}`}
            onClick={() => handleClick(2)}
          >
            <button
              className={`${styles['content-nav-btn']} ${styles['content-nav-btn-infovisit']}`}
            >
              Информация о записи
            </button>
          </li>
          <li
            className={`${styles['content-nav-item']} ${checkActive(
              3,
              styles['active']
            )}`}
            onClick={() => handleClick(3)}
          >
            <button
              className={`${styles['content-nav-btn']} ${styles['content-nav-btn-medicalhistory']}`}
            >
              Медицинская история
            </button>
          </li>
        </ul>

        <h3 className={styles['content-nav-title']}>Личный кабинет</h3>
      </div>
    ),
  };
}

export default TabsPersonalAccountPatient;
