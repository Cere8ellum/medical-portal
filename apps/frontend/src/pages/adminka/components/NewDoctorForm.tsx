import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { QualificationCategory } from '../enum/category.enum';
import { Gender } from '../enum/gender.enum';
import { Speciality } from '../enum/speciality.enum';
import { DoctorType } from '../enum/type.enum';
import { DoctorDto } from '../interfaces/Doctor.dto';
import styles from '../styles/adminka.doctors.module.css';

const NewDoctorForm: React.FC = () => {
  return (
    <section id="content-section" className="">
      {}
      <div className={styles['content']}>
        <form className={styles['persdata-form']}>
          <div className={`${styles['persdata-field']}`}>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label className={''}>Login/email</label>
              <input type="email" name="email"></input>
            </div>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label>&nbsp; Пароль</label>
              <input type="password" name="password"></input>
            </div>
          </div>
          <div className={`${styles['persdata-field']}`}>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label className={''}>Фамилия</label>
              <input type="persdata-surname" name="lastname"></input>
            </div>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label>
                <i className=""></i> &nbsp; Имя{' '}
              </label>
              <input type="text" name="firstname"></input>
            </div>
          </div>

          <div
            className={`${styles['persdata-photo']} ${styles['persdata-wrap']} ${styles['persdata-text']}`}
          >
            <label className={''}>Фото</label>
            <input type="file" name="photo" className={styles['photo']}></input>
          </div>

          <div
            className={`${styles['persdata-wrap']} ${styles['info']} ${styles['persdata-text']}`}
          >
            <label>
              <i></i> &nbsp; Информация
            </label>
            <input
              type="text"
              name="info"
              className={styles['persdata-info']}
            ></input>
          </div>

          <div className={`${styles['persdata-field']}`}>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label className={''}>Телефон</label>
              <input type="tel" name="mobile"></input>
            </div>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label>&nbsp; Дата рождения</label>
              <input type="date" name="firstname"></input>
            </div>
          </div>

          <div className={`${styles['persdata-field']}`}>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label>
                <i className=""></i> &nbsp; Стоимость за прием{' '}
              </label>
              <input
                type="text"
                name="price"
                className={`${styles['persdata-field']} ${styles['persdata-surname']}`}
              ></input>
            </div>

            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label>
                <i className=""></i> &nbsp; Год начала практики
              </label>
              <input
                type="text"
                name="startWorking"
                className={`${styles['persdata-field']} ${styles['persdata-surname']}`}
              ></input>
            </div>
          </div>
          <div className={`${styles['persdata-field']}`}>
            <select
              name="speciality"
              id="speciality"
              className={`${styles['persdata-field-select']} ${styles['persdata-surname']}`}
              // onChange={handleSpecial}
            >
              <option value="speciality">Специализация</option>
              {Object.entries(Speciality).map((value) => {
                return <option value={`${value[0]}`}>{value[1]}</option>;
              })}
            </select>

            <select
              name="category"
              id="category"
              className={`${styles['persdata-field-select']} ${styles['persdata-surname']}`}
            >
              <option value="category">Категория</option>
              {Object.entries(QualificationCategory).map((value) => {
                return <option value={`${value[0]}`}>{value[1]}</option>;
              })}
            </select>
          </div>
          <div className={`${styles['persdata-field']}`}>
            <select
              name="gender"
              id="gender"
              className={`${styles['persdata-field-select']} ${styles['persdata-surname']}`}
            >
              <option value="gender">Пол</option>
              {Object.entries(Gender).map((value) => {
                return <option value={`${value[0]}`}>{value[1]}</option>;
              })}
            </select>

            <select
              name="type"
              id="type"
              className={`${styles['persdata-field-select']} ${styles['persdata-surname']}`}
            >
              <option value="type">Тип</option>
              {Object.entries(DoctorType).map((value) => {
                return <option value={`${value[0]}`}>{value[1]}</option>;
              })}
            </select>
          </div>
          <button
            type="submit"
            className={`${styles['persdata-btn']} ${styles['persdata-btn-changedata']}`}
          >
            ИЗМЕНИТЬ ДАННЫЕ
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewDoctorForm;
