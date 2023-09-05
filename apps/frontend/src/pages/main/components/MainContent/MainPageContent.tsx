import { Link } from 'react-router-dom';
import styles from '../../styles/content.module.css';

function MainPageContent() {
  return (
    <main className={styles['content']}>
      <div className={styles['content-opasity']}>
        <div className={styles['content-top']}>
          <div className={styles['content-top-wrap']}>
            <div className={styles['content-top-info']}>
              <h2 className={styles['content-top-title']}>
                ЭЛЕКТРОННАЯ РЕГИСТРАТУРА
              </h2>
              <p className={styles['content-top-text']}>
                Сервис позволяет записаться на приём к врачу в поликлинику,
                перенести и отменить запись к врачу, просматривать направления,
                записаться на приём по направлению, просматривать рецепты.
              </p>
            </div>
            <div className={styles['content-top-button']}>
              <div className={styles['content-top-button-wrap']}>
                <Link className={styles['autirization-btn']} to="/login/">
                  АВТОРИЗОВАТЬСЯ
                </Link>
                <button className={styles['registration-btn']}>
                  ЗАРЕГИСТРИРОВАТЬСЯ
                </button>
              </div>
              <button className={styles['entry-btn']}>
                ЗАПИСАТЬСЯ НА ПРИЕМ
              </button>
            </div>
          </div>
          <div className={styles['content-top-img-wrap']}>
            <img
              className={styles['content-top-img']}
              src="../assets/images/main-image.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className={styles['content-bottom']}>
        <ul className={styles['content-menu-list']}>
          <li className={styles['content-menu-item']}>
            <h3 className={styles['content-menu-title']}>НАШИ ВРАЧИ</h3>
            <p className={styles['content-menu-text']}>
              Специализация, опыт работы, образование
            </p>
            <img
              src="../assets/images/main-doctor.png"
              alt="Наши врачи"
              className={styles['content-menu-img']}
            />
          </li>
          <li className={styles['content-menu-item']}>
            <h3 className={styles['content-menu-title']}>ОТЗЫВЫ</h3>
            <p className={styles['content-menu-text']}>
              Рейтинг, отзывы, стоимость приема
            </p>
            <img
              src="../assets/images/main-doctor-women.png"
              alt="Наши врачи"
              className={styles['content-menu-img']}
            />
          </li>
          <li className={styles['content-menu-item']}>
            <h3 className={styles['content-menu-title']}>
              ИНФОРМАЦИЯ О КНИНИКЕ
            </h3>
            <p className={styles['content-menu-text']}>
              Адрес клиники, фотографии, схема проезда
            </p>
            <img
              src="../assets/images/main-flat.png"
              alt="Наши врачи"
              className={styles['content-menu-img']}
            />
          </li>
        </ul>
      </div>
    </main>
  );
}

export default MainPageContent;
