import MainLayout from 'apps/frontend/src/app/MainLayout';
import { useEffect, useState } from 'react';
import styles from './styles/profile.module.css';

export function Profile() {
  return (
    <MainLayout>
      <main className={styles['content']}>
        <div className={styles['content-top']}>
          <ul className={styles['content-nav']}>
            <li
              className={`${styles['content-nav-item']} ${styles['content-nav-item-active']}`}
            >
              {/* //content-nav-item-active"> */}
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
          <a
            href="#"
            className={`${styles['header-nav-link']} ${styles['header-nav-office']}`}
          >
            <svg
              width="42"
              height="37"
              viewBox="0 0 42 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.5 21.6248C18.1379 21.6248 20.2811 19.4654 20.2811 16.8121C20.2811 14.1589 18.1379 12 15.5 12C14.8336 12.0105 14.1789 12.1465 13.5861 12.3975C12.9933 12.6485 12.4781 13.008 12.0801 13.4483C11.1777 14.4117 10.6979 15.5984 10.7189 16.815C10.7189 19.4659 12.8621 21.6248 15.5 21.6248ZM15.5 12.8752C17.5517 12.8752 19.2189 14.6417 19.2189 16.8126C19.2189 18.9836 17.5506 20.75 15.5 20.75C13.4494 20.75 11.7811 18.9831 11.7805 16.8126C11.7799 14.6421 13.4483 12.8752 15.5 12.8752ZM19.2189 20.75C19.078 20.75 18.9428 20.7961 18.8431 20.8782C18.7435 20.9602 18.6875 21.0716 18.6875 21.1876C18.6875 21.3037 18.7435 21.415 18.8431 21.4971C18.9428 21.5791 19.078 21.6252 19.2189 21.6252C20.2049 21.6261 21.1502 21.9491 21.8474 22.5232C22.5446 23.0974 22.9367 23.8759 22.9378 24.6879C22.9375 24.8038 22.8814 24.9149 22.7819 24.9969C22.6823 25.0788 22.5474 25.125 22.4067 25.1252H8.59447C8.4537 25.125 8.31882 25.0788 8.21928 24.9969C8.11975 24.9149 8.06367 24.8038 8.06336 24.6879C8.0646 23.8759 8.45682 23.0975 9.15398 22.5234C9.85114 21.9493 10.7963 21.6263 11.7823 21.6252C11.9231 21.6252 12.0582 21.5792 12.1578 21.4971C12.2574 21.4151 12.3134 21.3039 12.3134 21.1879C12.3134 21.0719 12.2574 20.9606 12.1578 20.8786C12.0582 20.7966 11.9231 20.7505 11.7823 20.7505C10.5146 20.7514 9.29911 21.1664 8.40255 21.9045C7.50598 22.6425 7.00155 23.6434 7 24.6874C7.00047 25.0354 7.16854 25.369 7.46735 25.6151C7.76616 25.8612 8.17131 25.9996 8.59389 26H22.4067C22.8292 25.9995 23.2342 25.861 23.5329 25.6149C23.8316 25.3689 23.9995 25.0353 24 24.6874C23.9984 23.6435 23.4943 22.6428 22.598 21.9046C21.7017 21.1665 20.4864 20.7513 19.2189 20.75Z"
                fill="#3D537C"
              />
              <path
                d="M25.3672 18.0494H40.642M40.642 18.0494L34.0957 23.7555M40.642 18.0494L34.0957 12.3433"
                stroke="#3D537C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M31.5497 6.70613V4.80409C31.5497 2.70315 29.5958 1 27.1854 1H5.36424C2.95393 1 1 2.70315 1 4.80409V31.4327C1 33.5337 2.95393 35.2368 5.36424 35.2368H27.1854C29.5958 35.2368 31.5497 33.5337 31.5497 31.4327V29.5307"
                stroke="#3D537C"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className={styles['content-form']}>
          <form className={styles['persdata-form']} action="#">
            <div className={styles['persdata-fields-container']}>
              <div className={styles['persdata-field-wrap']}>
                <p
                  className={`${styles['persdata-text']} ${styles['persdata-text-surname']}`}
                >
                  Фамилия
                </p>
                <input
                  className={`${styles['persdata-field']} ${styles['persdata-field-surname']}`}
                  type="text"
                />
              </div>
              <div className={styles['persdata-field-wrap']}>
                <p
                  className={`${styles['persdata-text']} ${styles['persdata-text-name']}`}
                >
                  Имя
                </p>
                <input
                  className={`${styles['persdata-field']} ${styles['persdata-field-name']}`}
                  type="text"
                />
              </div>
              <div className={styles['persdata-field-wrap']}>
                <p
                  className={`${styles['persdata-text']} ${styles['persdata-text-birthdate']}`}
                >
                  Дата рождения
                </p>
                <input
                  className={`${styles['persdata-field']} ${styles['persdata-field-birthdate']}`}
                  type="date"
                />
              </div>
              <div className={styles['persdata-field-wrap']}>
                <p
                  className={`${styles['persdata-text']} ${styles['persdata-text-phonenum']}`}
                >
                  Номер телефона
                </p>
                <input
                  className={`${styles['persdata-field']} ${styles['persdata-field-phonenum']}`}
                  type="number"
                />
              </div>
              <div className={styles['persdata-field-wrap']}>
                <p
                  className={`${styles['persdata-text']} ${styles['persdata-text-email']}`}
                >
                  e-mail
                </p>
                <input
                  className={`${styles['persdata-field']} ${styles['persdata-field-email']}`}
                  type="email"
                />
              </div>
              <div className={styles['persdata-field-wrap']}>
                <p
                  className={`${styles['persdata-text']} ${styles['persdata-text-address']}`}
                >
                  Адрес фактического проживания
                </p>
                <input
                  className={`${styles['persdata-field']} ${styles['persdata-field-address']}`}
                  type="text"
                />
              </div>
              <div className={styles['persdata-field-wrap']}></div>
              <div
                className={`${styles['persdata-field-wrap']} ${styles['persdata-field-wrap-gender']}`}
              >
                <p
                  className={`${styles['persdata-text']} ${styles['persdata-text-gender']}`}
                >
                  Пол
                </p>
                <div className={styles['persdata-gender-wrap']}>
                  <div className={styles['persdata-gender-wrap-woman']}>
                    <input
                      checked
                      type="radio"
                      name="persdata-gender"
                      value="woman"
                      id="woman"
                      className={`${styles['persdata-field']} ${styles['persdata-field-gender']}`}
                    />
                    <label htmlFor="woman">
                      <p>Женский</p>
                    </label>
                  </div>
                  <div className={styles['persdata-gender-wrap-man']}>
                    <input
                      type="radio"
                      name="persdata-gender"
                      value="man"
                      id="man"
                      className={`${styles['persdata-field']} ${styles['persdata-field-gender']}`}
                    ></input>
                    <label htmlFor="man">
                      <p>Мужской</p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles['persdata-btns-container']}>
              <button
                className={`${styles['persdata-btn']} ${styles['persdata-btn-changepass']}`}
              >
                ИЗМЕНИТЬ ПАРОЛЬ
              </button>
              <button
                className={`${styles['persdata-btn']} ${styles['persdata-btn-changedata']}`}
              >
                ИЗМЕНИТЬ ДАННЫЕ
              </button>

              <button
                className={`${styles['persdata-btn']} ${styles['persdata-btn-save']}`}
              >
                СОХРАНИТЬ
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
                    stroke-width="5.09988"
                    stroke-linecap="round"
                  />
                  <path
                    d="M36.3828 33.6008C36.3828 25.9188 42.6104 19.6913 50.2923 19.6913C57.9742 19.6913 64.2018 25.9188 64.2018 33.6008V34.9917"
                    stroke="white"
                    stroke-width="5.09988"
                    stroke-linecap="round"
                  />
                  <path
                    d="M22.4733 28.037C28.6188 28.037 33.6009 23.0549 33.6009 16.9094C33.6009 10.7638 28.6188 5.78186 22.4733 5.78186C16.3277 5.78186 11.3457 10.7638 11.3457 16.9094C11.3457 23.0549 16.3277 28.037 22.4733 28.037Z"
                    stroke="white"
                    stroke-width="5.09988"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M50.2925 19.6914C54.9018 19.6914 58.6382 15.9549 58.6382 11.3457C58.6382 6.73651 54.9018 3 50.2925 3C45.6831 3 41.9468 6.73651 41.9468 11.3457C41.9468 15.9549 45.6831 19.6914 50.2925 19.6914Z"
                    stroke="white"
                    stroke-width="5.09988"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
    </MainLayout>
  );
}
