import styles from './Contacts.module.css';
import Iframe from 'react-iframe';

function Contacts() {
  return (
    <div>
      <main className={styles['content']}>
        <div className={styles['contacts-info']}>
          <h1 className={styles['contacts-title']}>КОНТАКТЫ</h1>
          <div className={styles['contacts-info-container']}>
            <div className={styles['contacts-info-wrap']}>
              <ul className={styles['contacts-info-list']}>
                <li className={styles['contacts-info-item']}>
                  <img
                    className={
                      styles['contacts-info-icon contacts-info-icon-geo']
                    }
                    src="../../assets/images/contacts-images/icon_geo.png"
                    alt=""
                  ></img>
                  <p className={styles['contacts-info-text']}>
                    Адрес: Москва, пр-кт Маршала Жукова, д.4
                  </p>
                </li>
                <li className={styles['contacts-info-item']}>
                  <img
                    className={
                      styles['contacts-info-icon contacts-info-icon-metro']
                    }
                    src="../../assets/images/contacts-images/icon_metro.png"
                    alt=""
                  ></img>
                  <p className={styles['contacts-info-text']}>Метро Хорошево</p>
                </li>
                <li className={styles['contacts-info-item']}>
                  <img
                    className={
                      styles['contacts-info-icon contacts-info-icon-time']
                    }
                    src="../../assets/images/contacts-images/icon_time.png"
                    alt=""
                  ></img>
                  <p className={styles['contacts-info-text']}>
                    Часы работы: Пн-Вс: 8:00-20:00
                  </p>
                </li>
                <li className={styles['contacts-info-item']}>
                  <img
                    className={
                      styles['contacts-info-icon contacts-info-icon-mail']
                    }
                    src="../../assets/images/contacts-images/icon_mail.png"
                    alt=""
                  ></img>
                  <p className={styles['contacts-info-text']}>
                    Email: medical_online@mail.ru
                  </p>
                </li>
                <li className={styles['contacts-info-item']}>
                  <img
                    className={
                      styles['contacts-info-icon contacts-info-icon-phone']
                    }
                    src="../../assets/images/contacts-images/icon_phone.png"
                    alt=""
                  ></img>
                  <p className={styles['contacts-info-text']}>
                    +7(987)654-32-10
                  </p>
                </li>
                <li className={styles['contacts-info-item']}>
                  <img
                    className={
                      styles['contacts-info-icon contacts-info-icon-time']
                    }
                    src="../../assets/images/contacts-images/icon_time.png"
                    alt=""
                  ></img>
                  <p className={styles['contacts-info-text']}>
                    Часы работы: Пн-Вс: 8:00-20:00
                  </p>
                </li>
              </ul>

              <div className={styles['contacts-legal-wrap']}>
                <div className={styles['contacts-legal-title-wrap']}>
                  <img
                    className={
                      styles['contacts-info-icon contacts-info-icon-time']
                    }
                    src="../../assets/images/contacts-images/icon_document.png"
                    alt=""
                  ></img>
                  <h3 className={styles['contacts-legal-title']}>
                    Данные об организации
                  </h3>
                </div>
                <ul className={styles['contacts-legal-list']}>
                  <li className={styles['contacts-legal-item']}>
                    <p className={styles['contacts-legal-text']}>
                      ООО "Medical-online"
                    </p>
                  </li>
                  <li className={styles['contacts-legal-item']}>
                    <p className={styles['contacts-legal-text']}>
                      ИНН: 7704544391
                    </p>
                  </li>
                  <li className={styles['contacts-legal-item']}>
                    <p className={styles['contacts-legal-text']}>
                      ОГРН: 1057746061262
                    </p>
                  </li>
                  <li className={styles['contacts-legal-item']}>
                    <p className={styles['contacts-legal-text']}>
                      Юридический адрес: Москва, Комсомольский проспект, дом 28,
                      эт 1, 3 пом III, VI.
                    </p>
                  </li>
                  <li className={styles['contacts-legal-item']}>
                    <p className={styles['contacts-legal-text']}>
                      Генеральный директор: Миронович Филипп Александрович
                    </p>
                  </li>
                  <li className={styles['contacts-legal-item']}>
                    <p className={styles['contacts-legal-text']}>
                      Учредители: АО «Инвест-Полис»
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['map']}>
          <Iframe
            url="https://yandex.ru/map-widget/v1/?um=constructor%3A8d478f4d04b78e6943a683b4e9c8d1b0de47a5f37eeeb3035b3add389cf4e24d&amp;source=constructor"
            width="1007"
            height="337"
          ></Iframe>
        </div>
      </main>
    </div>
  );
}

export default Contacts;
