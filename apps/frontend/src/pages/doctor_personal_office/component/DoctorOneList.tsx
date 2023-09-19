import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios, { isAxiosError } from 'axios';

function Body() {
  const [doctorData, setDoctorData] = useState({
    id: 0,
    firstname: '',
    lastname: '',
    workExperience: '',
    infomation: '',
    costPerAppointment: '',
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      privacyAgreement: false,
    },
    onSubmit: async ({ email, password }, { resetForm }) => {
      try {
        const {
          request: { statusText },
        } = await axios.post(`http://localhost:3000/api/doctors/create`, {
          userId: '6',
          firstname: doctorData.firstname,
          lastname: doctorData.lastname,
          gender: 'male',
          speciality: 'Кардиолог',
          startWorking: '1990 год',
        });
      } catch (err) {
        if (
          isAxiosError(err) &&
          err.response !== null &&
          err.response !== undefined
        ) {
          console.log('hume_b');
        } else {
          console.error(err);
        }
      }
    },
  });

  const [specialization, setSpecialization] = useState('');

  const [checkedRadio, setCheckedRadio] = useState('two');

  const [checkedRadioType, setCheckedRadioType] = useState('adult');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorData({ ...doctorData, [event.target.name]: event.target.value });
  };

  const handleChangeSelect = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSpecialization(event.target.value);
  };

  const handleChackedRadio = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setCheckedRadio(event.target.value);
  };

  const handleChackedRadioType = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setCheckedRadioType(event.target.value);
  };

  return (
    <section id="content-section" className="">
      <div className="content ">
        <div className="hero-content">
          <div className="content-top ">
            <div className="content-nav">
              <Link
                className="content-nav-item content-nav-active content-nav-btn header-nav-link persdata-active"
                to="/doctorOneList"
              >
                Личные данные
              </Link>

              <Link
                className="content-nav-item content-nav-btn header-nav-link reception"
                to="/doctorTwoList"
              >
                Приемы
              </Link>

              <Link
                className="content-nav-item content-nav-btn header-nav-link timetable whitable"
                to=""
              >
                График отсутствия
              </Link>
            </div>
            <h3 className="content-title">Личный кабинет врача</h3>
          </div>
          <div className="content-form">
            <form
              className="persdata-form"
              method="post"
              onSubmit={formik.handleSubmit}
            >
              <div className="persdata-fields-container">
                <div className="persdata-field-wrap persdata-text">
                  <label>
                    <i className="surnamed"></i> &nbsp; Фамилия{' '}
                  </label>
                  <input
                    value={doctorData.lastname}
                    type="persdata-surname"
                    name="lastname"
                    className="persdata-field persdata-surname"
                    onChange={handleChange}
                  ></input>
                </div>

                <div className="persdata-field-wrap info persdata-text">
                  <label>
                    <i className="a-location-dot"></i> &nbsp; Информация{' '}
                  </label>
                  <input
                    value={doctorData.infomation}
                    onChange={handleChange}
                    name="infomation"
                    type="text"
                    className="persdata-info"
                  ></input>
                </div>

                <div className="persdata-field-wrap persdata-text">
                  <label>
                    <i className=""></i> &nbsp; Имя{' '}
                  </label>
                  <input
                    value={doctorData.firstname}
                    onChange={handleChange}
                    name="firstname"
                    type="text"
                    className="persdata-field persdata-surname"
                  ></input>
                </div>

                <div className="persdata-field-wrap persdata-text">
                  <label>
                    <i className=""></i> &nbsp; Стоимость за прием{' '}
                  </label>
                  <input
                    value={doctorData.costPerAppointment}
                    onChange={handleChange}
                    name="costPerAppointment"
                    type="text"
                    className="persdata-field persdata-surname"
                  ></input>
                </div>

                <div className="persdata-field-wrap persdata-text">
                  <label>
                    <i className=""></i> &nbsp; Стаж работы
                  </label>
                  <input
                    value={doctorData.workExperience}
                    onChange={handleChange}
                    name="workExperience"
                    type="text"
                    className="persdata-field persdata-surname"
                  ></input>
                </div>

                <div className="persdata-field-wrap persdata-text">
                  <label>
                    <i className=""></i> &nbsp; Специализация {specialization}
                  </label>
                  <select
                    className="persdata-field-select persdata-surname"
                    value={specialization}
                    onChange={handleChangeSelect}
                  >
                    <option>Артролог</option>
                    <option>Вегетолог</option>
                    <option>Диабетолог</option>
                    <option>Невролог</option>
                    <option>Психиатр</option>
                    <option>Эндокринолог</option>
                  </select>
                </div>

                <div className="persdata-field-wrap persdata-field-wrap-сategory persdata-text">
                  <p className="сategory">Категория</p>
                  <div className="persdata-wrap">
                    <div className="persdata-сategory-two">
                      <input
                        checked={checkedRadio == 'two' ? true : false}
                        type="radio"
                        name="persdata-dender-сategory"
                        value="two"
                        id="two"
                        className="persdata-field persdata-field-click"
                        onChange={handleChackedRadio}
                      />
                      <label htmlFor="two">
                        <p>Вторая</p>
                      </label>
                    </div>
                    <div className="persdata-сategory-one">
                      <input
                        checked={checkedRadio == 'first' ? true : false}
                        type="radio"
                        name="persdata-dender-сategory"
                        value="first"
                        id="one"
                        className="persdata-field persdata-field-click"
                        onChange={handleChackedRadio}
                      />
                      <label htmlFor="one">
                        <p>Первая</p>
                      </label>
                    </div>
                    <div className="persdata-сategory-higher">
                      <input
                        checked={checkedRadio == 'higher' ? true : false}
                        type="radio"
                        name="persdata-dender-сategory"
                        value="higher"
                        id="higher"
                        className="persdata-field persdata-field-click"
                        onChange={handleChackedRadio}
                      />
                      <label htmlFor="higher">
                        <p>Высшая</p>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="persdata-field-wrap persdata-field-wrap-age persdata-text">
                  <p className="age">Тип</p>
                  <div className="persdata-wrap">
                    <div className="persdata-age-adult">
                      <input
                        checked={checkedRadioType == 'adult' ? true : false}
                        type="radio"
                        name="persdata-dender"
                        value="adult"
                        id="adult"
                        className="persdata-field persdata-field-click"
                        onChange={handleChackedRadioType}
                      />
                      <label htmlFor="adult">
                        <p>Взрослый</p>
                      </label>
                    </div>
                    <div className="persdata-age-child">
                      <input
                        checked={checkedRadioType == 'child' ? true : false}
                        type="radio"
                        name="persdata-dender"
                        value="child"
                        id="child"
                        className="persdata-field persdata-field-click"
                        onChange={handleChackedRadioType}
                      />
                      <label htmlFor="child">
                        <p>Детский</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="persdata-btns-container">
                <div className="container-content__box">
                  <button
                    type="submit"
                    className="persdata-btn persdata-btn-changedata"
                  >
                    ИЗМЕНИТЬ ДАННЫЕ
                  </button>
                </div>

                <div className="container-content__box">
                  <button
                    type="submit"
                    className="persdata-btn persdata-btn-changepass "
                  >
                    ИЗМЕНИТЬ ПАРОЛЬ
                  </button>
                </div>

                <div className="container-content__box">
                  <button
                    type="submit"
                    className="persdata-btn persdata-btn-save"
                  >
                    СОХРАНИТЬ
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
