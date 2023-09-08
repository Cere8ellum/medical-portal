import { useState } from 'react';
import { Link } from 'react-router-dom';

function Body() {
  const [modal, setModal] = useState(false); //  class - persdata-form

  return (
    <section id="content-section" className="">
      {}
      <div className="content ">
        <div className="hero-content-three">
          <div className="content-top ">
            <div className="content-nav">
              <Link
                className="content-nav-item content-nav-btn header-nav-link "
                to="/doctorOneList"
              >
                Личные данные
              </Link>

              <Link
                className="content-nav-item content-nav-btn header-nav-link reception "
                to="/doctorTwoList"
              >
                Приемы
              </Link>

              <Link
                className="content-nav-item content-nav-active content-nav-btn header-nav-link timetable persdata-active"
                to="/doctorThreeList"
              >
                График отсутствия
              </Link>
            </div>
            <h3 className="content-title">Личный кабинет врача</h3>
          </div>

          <div
            className={`content-persdata-form"${modal ? 'persdata-form' : ''}`}
          ></div>
          <div className="content-form">
            <h6 className="content-title-absent">График отсутствия врача</h6>
            <button type="submit" className="content-title-btn">
              +ДОБАВИТЬ
            </button>

            <form>
              <input
                className="persdata-field-wrap-three-list persdata-field-three-date"
                type="date"
              ></input>
              <input
                type="text"
                placeholder="*причина отсутствия"
                className="reason-absence"
              />
              <button type="submit" className="reason-absence-delete">
                УДАЛИТЬ
              </button>
              <form className="persdata-form" action="#"></form>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
