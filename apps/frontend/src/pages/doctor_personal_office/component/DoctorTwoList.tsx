import { useState } from 'react';
import { Link } from 'react-router-dom';

function Body() {
  const dataPacient = [
    {
      date: '2023-08-15',
      time: '09:46',
      patient_name: 'Ivan Ivanov',
      patient_id: 19,
      id: 14,
    },
    {
      date: '2023-08-15',
      time: '14:30',
      patient_name: 'Ivan Ivanov',
      patient_id: 19,
      id: 12,
    },
    {
      date: '2023-08-15',
      time: '15:30',
      patient_name: 'Ivan Ivanov',
      patient_id: 19,
      id: 13,
    },
  ];

  const handleBegin = (event: React.SyntheticEvent) => {
    return event.currentTarget;
  };

  const pacientEnter = dataPacient.map((pacient) => {
    return (
      <>
        <div className="persdata-field-wrap-two-list-table">
          <input
            className="persdata-field-time persdata-time"
            type="time"
            id="appt"
            name="appt"
            min="08:00"
            max="20:00"
            required
            placeholder="*Время приема"
            value={pacient.time}
          ></input>
        </div>

        <div className="persdata-field-wrap-two-list-table">
          <input
            className="persdata-field-info persdata-info-person"
            type="text"
            placeholder="*Информация о пациенте"
            value={pacient.patient_name}
          ></input>
        </div>

        <div className="persdata-field-wrap-two-list-table">
          <input
            className="persdata-field-time persdata-time"
            type="time"
            id="appt"
            name="appt"
            min="08:00"
            max="20:00"
            placeholder="*Время приема"
          ></input>
        </div>

        <div className="persdata-btns-container-two-list">
          <button className="persdata-btn-two-list persdata-btn-history">
            ИСТОРИЯ ВИЗИТА
          </button>
        </div>

        <Link
          onClick={handleBegin}
          className="persdata-btn-two-list persdata-btn-start"
          to="/opinionform/19"
          target="_blank"
          rel="noopener noreferrer"
        >
          НАЧАТЬ ПРИЕМ
        </Link>
      </>
    );
  });

  const [tumbler, setTumbler] = useState(true);

  const [doctorDate, setDoctorDate] = useState('');
  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorDate(event.target.value);
  };

  const handleClickDate = (event: React.SyntheticEvent) => {
    setTumbler(false);
  };
  return (
    <section id="content-section" className="">
      <div className="content ">
        <div className="hero-content-two">
          <div className="content-top ">
            <div className="content-nav">
              <Link
                className="content-nav-item content-nav-btn header-nav-link "
                to="/doctorOneList"
              >
                Личные данные
              </Link>

              <Link
                className="content-nav-item content-nav-active content-nav-btn header-nav-link reception persdata-active"
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
            <input
              onChange={handleChangeDate}
              value={doctorDate}
              className="persdata-field-wrap-two-list persdata-field-date"
              type="date"
            ></input>
            <div>
              <p style={{ marginLeft: '25px', fontSize: '24px' }}>
                Выбранная дата: {doctorDate}
              </p>
              <button
                onClick={handleClickDate}
                className="persdata-btn-two-list persdata-btn-start"
              >
                Посмотреть записавшихся пациентов
              </button>
            </div>
            <form className="persdata-form ">
              <div className="persdata-fields-container-two-list-table">
                {tumbler ? <p>Ничего нет</p> : pacientEnter}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
