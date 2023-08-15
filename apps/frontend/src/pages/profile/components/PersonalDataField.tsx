import styles from '../styles/profile.module.css';

function PersonalDataField() {
  return (
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
  );
}

export default PersonalDataField;
