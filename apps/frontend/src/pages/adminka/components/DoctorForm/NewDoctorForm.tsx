import api from 'apps/frontend/src/infrastructure/api';
import dayjs from 'dayjs';
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { QualificationCategory } from '../../enum/category.enum';
import { Gender } from '../../enum/gender.enum';
import { Speciality } from '../../enum/speciality.enum';
import { DoctorType } from '../../enum/type.enum';
import { DoctorDto } from '../../interfaces/Doctor.dto';
import styles from '../../styles/adminka.doctors.module.css';
import { snackbarStore } from '../../../../stores';
import { Snackbar } from './../../../../components';
import DoctorFind from './DoctorFind';

interface DoctorFormProps {
  isCreate: boolean | null;
  getIsForm: (isForm: boolean) => void;
}

const YEAR = dayjs().format('YYYY');

const DoctorForm: React.FC<DoctorFormProps> = ({
  isCreate,
  getIsForm,
}: DoctorFormProps) => {
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    mobile: '',
    gender: '',
    price: '2000',
    photo: '',
    info: '',
    category: '',
    speciality: '',
    startWorking: YEAR,
    type: '',
    birthdate: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [doctor, setDoctor] = useState<DoctorDto | undefined>(undefined);
  const selectSpecialityRef = useRef<HTMLSelectElement | null>(null);
  const [formCheck, setFormCheck] = useState(false);

  const isFormValid = (): boolean => {
    let isFormErrors = true;
    for (const [key, value] of Object.entries(formData)) {
      switch (key) {
        case 'password':
          continue;
        case 'address':
          continue;
        case 'price':
          continue;
        case 'startWorking':
          continue;
        case 'password':
          if (value.length < 8) {
            isFormErrors = false;
          }
          break;
        case 'email':
          if (!isValidEmail(value)) {
            isFormErrors = false;
          }
          break;
        case 'mobile':
          if (!isValidatePhone(value)) {
            isFormErrors = false;
          }
          break;
        case 'lastname':
          if (!isValidName(value)) {
            isFormErrors = false;
          }
          break;
        case 'firstname':
          if (!isValidName(value)) {
            isFormErrors = false;
          }
          break;
        default:
          if (value === '') {
            isFormErrors = false;
          }
      }
    }
    setFormCheck(true);
    return isFormErrors;
  };

  const FReader = new FileReader();

  FReader.onload = function (e: ProgressEvent<FileReader>) {
    setFormData({ ...formData, ['photo']: e.target?.result as string });
  };

  const handleChange = async (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let { name, value } = event.target;

    if (name === 'photo') {
      const file: HTMLInputElement | null = document.getElementById(
        'file'
      ) as HTMLInputElement;
      if (file !== null) {
        const photo = file.files;
        if (photo && photo.length > 0) {
          console.log();
          FReader.readAsDataURL(photo[0]);
          setFormData({ ...formData, [name]: value });
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const getDoctor = (doctor: DoctorDto | undefined): void => {
    setDoctor(doctor);
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidatePhone = (phoneNumber: string) => {
    const phoneRegex = /^[\d\s+\-()]+$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidName = (name: string) => {
    return name.length >= 3;
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
        price: doctor?.price || '2000',
        photo: `http://localhost:3000/${doctor?.photo}` || '',
        //photo: doctor?.photo || '',
        info: doctor?.info || '',
        category: doctor?.category || '',
        speciality: doctor?.speciality || '',
        startWorking: doctor?.startWorking || YEAR,
        type: doctor?.type || '',
        birthdate: dayjs(doctor?.user.birthdate).format('YYYY-MM-DD') || '',
        password: '',
      };
      setFormData(updatedFormData);
    }
  }, [doctor]);

  const update = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement | null = document.getElementById(
      'persdata'
    ) as HTMLFormElement;
    const data = new FormData(form);
    if (isFormValid() && form) {
      try {
        await api({
          method: 'patch',
          url: `/doctors/update/${doctor?.id}`,
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(({ data, status }) => {
            snackbarStore.setContent({
              severity: 'success',
              message: 'Изменения произошли успешно',
            });
            snackbarStore.handleOpen();
            getIsForm(false);
            setFormData(initialState);
          })
          .catch((error) => {
            snackbarStore.setContent({
              severity: 'error',
              message: 'Произошла ошибка. Повторите действие позже.',
            });
            snackbarStore.handleOpen();
            console.log(error);
          });
      } catch (error) {
        console.log('error', error);
        snackbarStore.setContent({
          severity: 'error',
          message: 'Произошла ошибка. Повторите действие позже.',
        });
        snackbarStore.handleOpen();
      }
    } else {
      snackbarStore.setContent({
        severity: 'warning',
        message: 'Необходимо заполнить корректно все поля со *',
      });
      snackbarStore.handleOpen();
    }
  };

  const create = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const form: HTMLFormElement | null = document.getElementById(
      'persdata'
    ) as HTMLFormElement;
    const data = new FormData(form);
    if (isFormValid() && formData.password !== '') {
      try {
        await api({
          method: 'post',
          url: `/doctors/create`,
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(({ data, status }) => {
            snackbarStore.setContent({
              severity: 'success',
              message: 'Доктор успешно создан',
            });
            snackbarStore.handleOpen();
            getIsForm(false);
            setFormData(initialState);
          })
          .catch((error) => {
            snackbarStore.setContent({
              severity: 'error',
              message: `Такой email уже существует или введен не корректно`,
            });
            snackbarStore.handleOpen();
            console.log(error);
          });
      } catch (error) {
        console.log('error', error);
        snackbarStore.setContent({
          severity: 'error',
          message: ' * Произошла ошибка. Повторите действие позже.',
        });
        snackbarStore.handleOpen();
      }
    } else {
      snackbarStore.setContent({
        severity: 'warning',
        message: 'Необходимо заполнить корректно все поля со *',
      });
      snackbarStore.handleOpen();
    }
  };

  const remove = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      await api({
        method: 'delete',
        url: `/doctors/${doctor?.id}`,
      })
        .then(({ data }) => {
          snackbarStore.setContent({
            severity: 'success',
            message: data,
          });
          snackbarStore.handleOpen();
          getIsForm(false);
          setFormData(initialState);
        })
        .catch((error) => {
          snackbarStore.setContent({
            severity: 'error',
            message: 'Произошла ошибка. Повторите действие позже.',
          });
          snackbarStore.handleOpen();
          console.log(error);
        });
    } catch (error) {
      snackbarStore.setContent({
        severity: 'error',
        message: 'Произошла ошибка. Повторите действие позже.',
      });
      snackbarStore.handleOpen();
      getIsForm(false);
      setFormData(initialState);
    }
  };

  return (
    <>
      <div className={styles['doctors-form-update']}>
        {!isCreate ? (
          <DoctorFind getDoctor={getDoctor} ref={selectSpecialityRef} />
        ) : (
          ''
        )}
      </div>
      <section id="content-section" className="">
        <div className={styles['content']}>
          <form className={styles['persdata-form']} id="persdata">
            <h3 className={styles['persdata-form-note']}>
              Поля со знаком * обязательны к заполнению
            </h3>
            <div className={`${styles['persdata-field']}`}>
              <div
                className={`${
                  !isCreate
                    ? styles['persdata-double']
                    : styles['persdata-wrap']
                }  ${styles['persdata-text']}
                ${
                  (formData.email === '' || !isValidEmail(formData.email)) &&
                  formCheck
                    ? styles['error']
                    : ''
                }`}
              >
                <label className={''}>* Login/email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {!isValidEmail(formData.email) &&
                formData.email !== '' &&
                formCheck ? (
                  <div className={styles['error-email']}>
                    Введите корректный email
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div
                className={`${styles['persdata-wrap']} ${
                  styles['persdata-text']
                }
              ${!isCreate ? styles['persdata-update'] : ''}
              ${
                formData.password === '' && isCreate && formCheck
                  ? styles['error']
                  : ''
              }
              `}
              >
                <label>&nbsp; * Пароль</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {formData.password.length < 8 &&
                formData.password !== '' &&
                formCheck ? (
                  <div className={styles['error-password']}>
                    Пароль должен содержать не менее 8 символов
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className={`${styles['persdata-field']}`}>
              <div
                className={`${styles['persdata-wrap']} ${
                  styles['persdata-text']
                }
                ${
                  (!isValidName(formData.lastname) ||
                    formData.lastname === '') &&
                  formCheck
                    ? styles['error']
                    : ''
                }`}
              >
                <label className={''}> * Фамилия</label>
                <input
                  type="persdata-surname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                {!isValidName(formData.lastname) &&
                formData.lastname !== '' &&
                formCheck ? (
                  <div className={styles['error-email']}>
                    Фамилия должна содержать не менее 3 символов
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div
                className={`${styles['persdata-wrap']} ${
                  styles['persdata-text']
                }
                ${
                  (!isValidName(formData.firstname) ||
                    formData.firstname === '') &&
                  formCheck
                    ? styles['error']
                    : ''
                }`}
              >
                <label>
                  <i className=""></i> &nbsp;* Имя{' '}
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                {!isValidName(formData.firstname) &&
                formData.firstname !== '' &&
                formCheck ? (
                  <div className={styles['error-password']}>
                    Имя должно содержать не менее 3 символов
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className={`${styles['persdata-field']}`}>
              <div
                className={`
                ${styles['persdata-wrap']}
                ${styles['persdata-text']}
                ${formData.photo === '' && formCheck ? styles['error'] : ''}`}
              >
                <label className={''}> * Фото</label>
                <input
                  id="file"
                  type="file"
                  name="photo"
                  onChange={handleChange}
                  className={styles['photo']}
                />
              </div>
              <div className={styles['persdata-photo']}>
                {formData.photo !== '' ? (
                  <img id="image" src={formData.photo} alt="photo" />
                ) : (
                  <div className={styles['persdata-photo-note']}>
                    <img
                      src="../../../assets/images/adminka/nophoto.png"
                      alt=""
                    />
                    <p>No photo</p>
                  </div>
                )}
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
              className={`${styles['persdata-wrap']} ${styles['info']} ${
                styles['persdata-text']
              }
              ${formData.info === '' && formCheck ? styles['error'] : ''}
              `}
            >
              <label>
                <i></i> &nbsp; * Информация
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
                className={`${styles['persdata-wrap']} ${
                  styles['persdata-text']
                }
                ${
                  (formData.mobile === '' ||
                    !isValidatePhone(formData.mobile)) &&
                  formCheck
                    ? styles['error']
                    : ''
                }`}
              >
                <label className={''}> * Телефон</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                {!isValidatePhone(formData.mobile) &&
                formData.mobile !== '' &&
                formCheck ? (
                  <div className={styles['error-email']}>
                    Введите номер телефона корректно
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div
                className={`${styles['persdata-wrap']} ${
                  styles['persdata-text']
                }
                ${
                  formData.birthdate === '' && formCheck ? styles['error'] : ''
                }`}
              >
                <label>&nbsp; * Дата рождения</label>
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
                className={`${styles['persdata-wrap']} ${styles['persdata-text']}
              `}
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
                className={`${styles['persdata-field-select']} ${
                  styles['persdata-surname']
                }
                ${
                  formData.speciality === '' && formCheck ? styles['error'] : ''
                }`}
                value={formData.speciality}
                onChange={handleChange}
              >
                <option value="">* Специализация</option>
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
                className={`${styles['persdata-field-select']} ${
                  styles['persdata-surname']
                }
                ${
                  formData.category === '' && formCheck ? styles['error'] : ''
                }`}
                value={formData.category}
                onChange={handleChange}
              >
                <option value=""> * Категория</option>
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
                className={`
                ${styles['persdata-field-select']}
                ${styles['persdata-surname']}
                ${formData.gender === '' && formCheck ? styles['error'] : ''}`}
                value={formData.gender}
                onChange={handleChange}
              >
                <option value=""> * Пол</option>
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
                className={`
                ${styles['persdata-field-select']}
                ${styles['persdata-surname']}
                ${formData.type === '' && formCheck ? styles['error'] : ''}`}
                value={formData.type}
                onChange={handleChange}
              >
                <option value="">* Тип</option>
                {Object.entries(DoctorType).map(([key, value]) => {
                  return (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div
              className={styles['btn-wrap']}
              style={{ display: !isCreate ? 'flex' : 'none' }}
            >
              <button
                type="submit"
                className={styles['persdata-btn']}
                onClick={update}
                disabled={doctor ? false : true}
              >
                Изменить
              </button>
              <button
                className={styles['persdata-btn']}
                onClick={remove}
                disabled={doctor ? false : true}
              >
                Удалить
              </button>
            </div>
            <button
              type="submit"
              className={styles['persdata-btn']}
              style={{ display: isCreate ? 'block' : 'none' }}
              onClick={create}
            >
              Добавить
            </button>
          </form>
        </div>
      </section>
      <Snackbar />
    </>
  );
};

export default DoctorForm;
