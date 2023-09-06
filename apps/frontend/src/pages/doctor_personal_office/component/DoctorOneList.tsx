// import { useState } from 'react';
import { Link } from 'react-router-dom';

function Body() {
  //   const [modal, setModal] = useState(false); //  class - persdata-form

  //   const [special, setMySpecial] = useState('');

  //   const handleSpecial = (e) => {
  //     setMySpecial(e.target.value);
  //   };

  //   const openModal = (e) => {
  //     e.preventDefault();
  //     const errorMsg = document.querySelector('.error-message');
  //     if ('') {
  //       errorMsg.style.display = 'flex';
  //     } else {
  //       setModal(!modal);
  //       const modalDiv = document.querySelector('.persdata-field');
  //       modalDiv.scroll(0, 0);
  //       errorMsg.style.display = 'none';
  //     }
  //   };

  return (
    <section id="content-section" className="">
      {}
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
                className="content-nav-item content-nav-btn header-nav-link timetable"
                to="/doctorThreeList"
              >
                График отсутствия
              </Link>
            </div>
            <h3 className="content-title">Личный кабинет врача</h3>
          </div>

          <div
          // className={`content-persdata-form"${modal ? 'persdata-form' : ''}`}
          ></div>
          <div className="content-form">
            <form className="persdata-form">
              <div className="persdata-fields-container">
                <div className="persdata-field-wrap persdata-text">
                  <label>
                    <i className="surnamed"></i> &nbsp; Фамилия{' '}
                  </label>
                  <input
                    type="persdata-surname"
                    className="persdata-field persdata-surname"
                  ></input>
                </div>

                <div className="persdata-field-wrap info persdata-text">
                  <label>
                    <i className="a-location-dot"></i> &nbsp; Информация{' '}
                  </label>
                  <input type="text" className="persdata-info"></input>
                </div>

                <div className="persdata-field-wrap persdata-text">
                  <label>
                    <i className=""></i> &nbsp; Имя{' '}
                  </label>
                  <input
                    type="text"
                    className="persdata-field persdata-surname"
                  ></input>
                </div>

                <div className="persdata-field-wrap persdata-text">
                  <label>
                    <i className=""></i> &nbsp; Стоимость за прием{' '}
                  </label>
                  <input
                    type="text"
                    className="persdata-field persdata-surname"
                  ></input>
                </div>

                <div className="persdata-field-wrap persdata-text">
                  <label>
                    {' '}
                    <i className=""></i> &nbsp; Стаж работы{' '}
                  </label>
                  <input
                    type="text"
                    className="persdata-field persdata-surname"
                  ></input>
                </div>

                <div className="persdata-field-wrap persdata-text">
                  <label>
                    {' '}
                    <i className=""></i> &nbsp; Специализация{' '}
                  </label>
                  <select
                    className="persdata-field-select persdata-surname"
                    // onChange={handleSpecial}
                  >
                    <option value="Артролог">Артролог</option>
                    <option value="Вегетолог">Вегетолог</option>
                    <option value="Диабетолог">Диабетолог</option>
                    <option value="Невролог">Невролог</option>
                    <option value="Психиатр">Психиатр</option>
                    <option value="Эндокринолог">Эндокринолог</option>
                  </select>
                </div>

                <div className="persdata-field-wrap persdata-field-wrap-сategory persdata-text">
                  <p className="сategory">Категория</p>
                  <div className="persdata-wrap">
                    <div className="persdata-сategory-two">
                      <input
                        checked
                        type="radio"
                        name="persdata-dender-сategory"
                        value="two"
                        id="two"
                        className="persdata-field persdata-field-click"
                      />
                      <label htmlFor="two">
                        <p>Вторая</p>
                      </label>
                    </div>
                    <div className="persdata-сategory-one">
                      <input
                        type="radio"
                        name="persdata-dender-сategory"
                        value="one"
                        id="one"
                        className="persdata-field persdata-field-click"
                      />
                      <label htmlFor="one">
                        <p>Первая</p>
                      </label>
                    </div>
                    <div className="persdata-сategory-higher">
                      <input
                        type="radio"
                        name="persdata-dender-сategory"
                        value="higher"
                        id="higher"
                        className="persdata-field persdata-field-click"
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
                        checked
                        type="radio"
                        name="persdata-dender"
                        value="adult"
                        id="adult"
                        className="persdata-field persdata-field-click"
                      />
                      <label htmlFor="adult">
                        <p>Взрослый</p>
                      </label>
                    </div>
                    <div className="persdata-age-child">
                      <input
                        type="radio"
                        name="persdata-dender"
                        value="child"
                        id="child"
                        className="persdata-field persdata-field-click"
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
                    {' '}
                    ИЗМЕНИТЬ ДАННЫЕ{' '}
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
                    СОХРАНИТЬ{' '}
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
