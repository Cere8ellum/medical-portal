// import { useState } from "react";
import { Link } from 'react-router-dom';

function Body() {
  //   const [modal, setModal] = useState(false); //  class - persdata-form

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
                className="content-nav-item content-nav-btn header-nav-link timetable"
                to="/doctorThreeList"
              >
                График отсутствия
              </Link>
            </div>
            <h3 className="content-title">Личный кабинет врача</h3>
          </div>

          <div
          // className={`content-persdata-form"${modal ? "persdata-form" : ""}`}
          ></div>
          <div className="content-form">
            <input
              className="persdata-field-wrap-two-list persdata-field-date"
              type="date"
            ></input>

            <form className="persdata-form " action="#">
              <div className="persdata-fields-container-two-list-table">
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
                  ></input>
                </div>

                <div className="persdata-field-wrap-two-list-table">
                  <input
                    className="persdata-field-info persdata-info-person"
                    type="text"
                    placeholder="*Информация о пациенте"
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
              </div>

              <div className="persdata-btns-container-two-list">
                <button
                  type="submit"
                  className="persdata-btn-two-list persdata-btn-history"
                >
                  ИСТОРИЯ ВИЗИТА
                </button>
              </div>

              <div className="persdata-btns-container-two-list">
                <button
                  type="submit"
                  className="persdata-btn-two-list persdata-btn-start"
                >
                  НАЧАТЬ ПРИЕМ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
