import dayjs from 'dayjs';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QualificationCategory } from '../../enum/category.enum';
import { Gender } from '../../enum/gender.enum';
import { Speciality } from '../../enum/speciality.enum';
import { DoctorType } from '../../enum/type.enum';
import { DoctorDto } from '../../interfaces/Doctor.dto';
import styles from '../../styles/adminka.doctors.module.css';

interface DoctorFormProps {
  doctor: DoctorDto | undefined;
  isCreate: boolean | null;
}

const DoctorForm: React.FC<DoctorFormProps> = ({
  doctor,
  isCreate,
}: DoctorFormProps) => {
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    mobile: '',
    gender: '',
    price: '',
    photo: '',
    info: '',
    category: '',
    speciality: '',
    startWorking: '',
    type: '',
    birthdate: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (doctor) {
      const updatedFormData = {
        firstname: doctor?.user.firstname || '',
        lastname: doctor?.user.lastname || '',
        email: doctor?.user.email || '',
        address: doctor?.user.address || '',
        mobile: doctor?.user.mobile || '',
        gender: doctor?.user.gender || '',
        price: doctor?.price || '',
        photo: doctor?.photo || '',
        info: doctor?.info || '',
        category: doctor?.category || '',
        speciality: doctor?.speciality || '',
        startWorking: doctor?.startWorking || '',
        type: doctor?.type || '',
        birthdate: dayjs(doctor?.user.birthdate).format('YYYY-MM-DD') || '',
        password: '',
      };
      setFormData(updatedFormData);
    }
  }, [doctor]);

  return (
    <section id="content-section" className="">
      <div className={styles['content']}>
        <form className={styles['persdata-form']}>
          <div className={`${styles['persdata-field']}`}>
            <div
              className={`${
                !isCreate ? styles['persdata-double'] : styles['persdata-wrap']
              }  ${styles['persdata-text']}`}
            >
              <label className={''}>Login/email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}
              ${!isCreate ? styles['persdata-update'] : ''}`}
            >
              <label>&nbsp; Пароль</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`${styles['persdata-field']}`}>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label className={''}>Фамилия</label>
              <input
                type="persdata-surname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label>
                <i className=""></i> &nbsp; Имя{' '}
              </label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`${styles['persdata-field']}`}>
            <div
              className={`${
                isCreate ? styles['persdata-double'] : styles['persdata-wrap']
              } ${styles['persdata-text']}`}
            >
              <label className={''}>Фото</label>
              <input
                type="file"
                name="photo"
                //value={formData.photo}
                onChange={handleChange}
                className={styles['photo']}
              />
            </div>
            <div
              className={
                isCreate ? styles['persdata-update'] : styles['persdata-photo']
              }
            >
              <img src={`http://localhost:3000${doctor?.photo}`} alt="photo" />
            </div>
          </div>

          <div
            className={`${styles['persdata-double']} ${styles['persdata-wrap']} ${styles['persdata-text']}`}
          >
            <label className={''}>Адресс</label>
            <input
              type="text"
              name="address"
              className={styles['photo']}
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div
            className={`${styles['persdata-wrap']} ${styles['info']} ${styles['persdata-text']}`}
          >
            <label>
              <i></i> &nbsp; Информация
            </label>
            <textarea
              name="info"
              className={styles['persdata-info']}
              value={formData.info}
              onChange={handleChange}
            />
          </div>

          <div className={`${styles['persdata-field']}`}>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label className={''}>Телефон</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div
              className={`${styles['persdata-wrap']} ${styles['persdata-text']}`}
            >
              <label>&nbsp; Дата рождения</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
              />
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
                value={formData.price}
                onChange={handleChange}
              />
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
                value={formData.startWorking}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={`${styles['persdata-field']}`}>
            <select
              name="speciality"
              id="speciality"
              className={`${styles['persdata-field-select']} ${styles['persdata-surname']}`}
              value={formData.speciality}
              onChange={handleChange}
            >
              <option value="speciality">Специализация</option>
              {Object.entries(Speciality).map(([key, value]) => {
                return (
                  <option key={key} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>

            <select
              name="category"
              id="category"
              className={`${styles['persdata-field-select']} ${styles['persdata-surname']}`}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="category">Категория</option>
              {Object.entries(QualificationCategory).map(([key, value]) => {
                return (
                  <option key={key} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={`${styles['persdata-field']}`}>
            <select
              name="gender"
              id="gender"
              className={`${styles['persdata-field-select']} ${styles['persdata-surname']}`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="gender">Пол</option>
              {Object.entries(Gender).map(([key, value]) => {
                return (
                  <option key={key} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>

            <select
              name="type"
              id="type"
              className={`${styles['persdata-field-select']} ${styles['persdata-surname']}`}
              value={formData.type}
              onChange={handleChange}
            >
              <option value="type">Тип</option>
              {Object.entries(DoctorType).map(([key, value]) => {
                return (
                  <option
                    key={key}
                    value={value}
                    selected={value === doctor?.type ? true : false}
                  >
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="submit"
            className={
              !isCreate
                ? `${styles['persdata-btn']} ${styles['persdata-btn-changedata']}`
                : styles['persdata-update']
            }
          >
            Изменить
          </button>
          <button
            type="submit"
            className={
              isCreate
                ? `${styles['persdata-btn']} ${styles['persdata-btn-changedata']}`
                : styles['persdata-update']
            }
          >
            Добавить
          </button>
        </form>
      </div>
    </section>
  );
};

export default DoctorForm;
