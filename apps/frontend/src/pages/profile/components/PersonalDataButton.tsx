import { MouseEvent } from 'react';
import { useGlobalContext } from '../MyGlobalContext';
import styles from '../styles/profile.module.css';

function PersonalDataButton() {
  const { setisEditable } = useGlobalContext();
  const editData = async (e: MouseEvent) => {
    if (e !== undefined) {
      e.preventDefault();
      setisEditable(true);
    }
  };

  return (
    <div className={styles['persdata-btns-container']}>
      <button
        className={`${styles['persdata-btn']} ${styles['persdata-btn-changepass']}`}
      >
        ИЗМЕНИТЬ ПАРОЛЬ
      </button>
      <button
        className={`${styles['persdata-btn']} ${styles['persdata-btn-changedata']}`}
        onClick={(e) => editData(e)}
      >
        ИЗМЕНИТЬ ДАННЫЕ
      </button>

      <button
        className={`${styles['persdata-btn']} ${styles['persdata-btn-addfamily']}`}
      >
        Добавить члена семьи
        <svg
          className="persdata-btn-addfamily-svg"
          width="67"
          height="53"
          viewBox="0 0 67 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 50.2923V47.5104C3 36.7556 11.7185 28.0371 22.4733 28.0371C33.2281 28.0371 41.9466 36.7556 41.9466 47.5104V50.2923"
            stroke="white"
            strokeWidth="5.09988"
            strokeLinecap="round"
          />
          <path
            d="M36.3828 33.6008C36.3828 25.9188 42.6104 19.6913 50.2923 19.6913C57.9742 19.6913 64.2018 25.9188 64.2018 33.6008V34.9917"
            stroke="white"
            strokeWidth="5.09988"
            strokeLinecap="round"
          />
          <path
            d="M22.4733 28.037C28.6188 28.037 33.6009 23.0549 33.6009 16.9094C33.6009 10.7638 28.6188 5.78186 22.4733 5.78186C16.3277 5.78186 11.3457 10.7638 11.3457 16.9094C11.3457 23.0549 16.3277 28.037 22.4733 28.037Z"
            stroke="white"
            strokeWidth="5.09988"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50.2925 19.6914C54.9018 19.6914 58.6382 15.9549 58.6382 11.3457C58.6382 6.73651 54.9018 3 50.2925 3C45.6831 3 41.9468 6.73651 41.9468 11.3457C41.9468 15.9549 45.6831 19.6914 50.2925 19.6914Z"
            stroke="white"
            strokeWidth="5.09988"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default PersonalDataButton;
