import { ConfirmationDialog } from 'apps/frontend/src/components';
import { authStore } from 'apps/frontend/src/stores';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/profile.module.scss';

let idx = 1;
function TabsPersonalAccountPatient() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const [exit, setExit] = useState<boolean>(false);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    idx = index;
    return index;
  };

  const checkActive = (index: number, className: string) =>
    activeIndex === index ? className : '';

  const logout = async () => {
    try {
      await authStore.logout();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

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
        </ul>
        <div className={styles['title']}>
          <h3 className={styles['content-nav-title']}>Личный кабинет</h3>
          <img
            src="./assets/images/user-logout.svg"
            alt="выйти"
            onClick={() => setExit(true)}
          />
        </div>
        <ConfirmationDialog
          message="Вы действительно хотите выйти?"
          open={exit}
          onConfirm={logout}
          onClose={() => setExit(false)}
        />
      </div>
    ),
  };
}

export default TabsPersonalAccountPatient;
