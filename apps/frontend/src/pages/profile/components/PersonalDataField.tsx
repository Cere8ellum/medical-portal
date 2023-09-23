import { MouseEvent, useEffect, useState } from 'react';
import styles from '../styles/profile.module.css';
import { useGlobalContext } from '../MyGlobalContext';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Users {
  data: {
    id: number;
    firstname: string;
    lastname: string;
    mobile: string;
    birthdate: string;
    address: string;
    email: string;
    gender: string;
  };
}

function PersonalDataField(user: Users) {
  const [open, setOpen] = useState(false);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const { isEditable, setisEditable } = useGlobalContext();
  useEffect(() => {}, [user]);

  const [formValue, setformValue] = useState(user.data);

  const handleChange = (e: any) => {
    e.preventDefault();
    setformValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const updateUsersData = async (e: any) => {
    e.preventDefault();
    const form = new FormData();
    form.append('lastname', formValue.lastname);
    form.append('firstname', formValue.firstname);
    form.append('email', formValue.email);
    form.append('address', formValue.address);
    form.append('birthdate', formValue.birthdate);
    form.append('gender', formValue.gender);
    form.append('mobile', formValue.mobile);
    const formDataObj: any = {};
    form.forEach((value, key) => (formDataObj[key] = value));
    try {
      const {
        request: { statusText },
      } = await axios({
        method: 'patch',
        url: `http://localhost:3000/api/user/${user.data.id}`,
        data: formDataObj,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
      if (statusText === 'OK') {
        setOpen(true);
        setisEditable(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className={styles['persdata-fields-container']}
        method="post"
        onSubmit={updateUsersData}
      >
        <div className={styles['persdata-field-wrap']}>
          <p
            className={`${styles['persdata-text']} ${styles['persdata-text-surname']}`}
          >
            Фамилия
          </p>
          <input
            className={`${styles['persdata-field']} ${styles['persdata-field-surname']}`}
            type="text"
            defaultValue={user.data.lastname}
            readOnly={!isEditable}
            name="lastname"
            onChange={handleChange}
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
            name="firstname"
            defaultValue={user.data.firstname}
            readOnly={!isEditable}
            onChange={handleChange}
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
            type="text"
            name="birthdate"
            defaultValue={user.data.birthdate}
            readOnly={!isEditable}
            onChange={handleChange}
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
            type="text"
            name="mobile"
            defaultValue={user.data.mobile}
            readOnly={!isEditable}
            onChange={handleChange}
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
            name="email"
            defaultValue={user.data.email}
            readOnly={!isEditable}
            onChange={handleChange}
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
            name="address"
            defaultValue={user.data.address}
            readOnly={!isEditable}
            onChange={handleChange}
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
                defaultChecked={user.data.gender === 'female' ? true : false}
                type="radio"
                name="gender"
                defaultValue="female"
                id="female"
                className={`${styles['persdata-field']} ${styles['persdata-field-gender']}`}
                disabled={!isEditable}
                onChange={handleChange}
              />
              <label htmlFor="female">
                <p>Женский</p>
              </label>
            </div>
            <div className={styles['persdata-gender-wrap-man']}>
              <input
                defaultChecked={user.data.gender === 'male' ? true : false}
                type="radio"
                name="gender"
                defaultValue="male"
                id="male"
                className={`${styles['persdata-field']} ${styles['persdata-field-gender']}`}
                disabled={!isEditable}
                onChange={handleChange}
              ></input>
              <label htmlFor="male">
                <p>Мужской</p>
              </label>
            </div>
          </div>
        </div>
        {isEditable ? (
          <button
            style={{
              marginLeft: '70px',
              alignSelf: 'flex-end',
            }}
            className={`${styles['persdata-btn']} ${styles['persdata-btn-save']}`}
            onClick={(e) => updateUsersData(e)}
            type="submit"
          >
            СОХРАНИТЬ
          </button>
        ) : (
          ''
        )}
      </form>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Данные сохранены
        </Alert>
      </Snackbar>
    </>
  );
}

export default PersonalDataField;
