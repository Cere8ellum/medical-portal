import { set } from 'mobx';
import React, { useEffect, useRef, useState } from 'react';
import { DoctorDto } from '../../interfaces/Doctor.dto';
import styles from '../../styles/adminka.module.css';
import {
  getDocId,
  getDoctorById,
  getDoctors,
  getSpeciality,
} from '../../utils/doctors';
import DoctorFind from './DoctorFind';
import DoctorForm from './NewDoctorForm';
import { snackbarStore } from '../../../../stores';
import { Form, Snackbar } from './../../../../components';

const DoctorsFunctional: React.FC = () => {
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [isForm, setIsForm] = useState<boolean>(false);

  const getIsForm = (isForm: boolean): void => {
    setIsForm(isForm);
  };

  return (
    <>
      <div className={styles['doctors']}>
        <div
          className={styles['doctors-btn']}
          style={{ display: isForm ? 'none' : 'flex' }}
        >
          <button
            onClick={() => {
              setIsCreate(true);
              setIsForm(true);
            }}
          >
            Добавить нового
          </button>
          <button
            onClick={() => {
              setIsCreate(false);
              setIsForm(true);
            }}
          >
            Изменить
          </button>
        </div>
        {isForm ? (
          <div
            className={styles['doctors-form']}
            //style={{ display: isForm ? 'flex' : 'none' }}
          >
            <img
              src="../../../assets/images/adminka/back.png"
              alt="back"
              className={styles['doctors-form-back']}
              onClick={() => {
                setIsForm(false);
              }}
              style={{}}
            />
            <DoctorForm isCreate={isCreate} getIsForm={getIsForm} />
          </div>
        ) : (
          ''
        )}
      </div>
      <Snackbar />
    </>
  );
};

export default DoctorsFunctional;
