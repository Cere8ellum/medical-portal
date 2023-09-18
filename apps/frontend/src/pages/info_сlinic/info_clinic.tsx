import styles from './info.module.css';

function InfoClinic() {
  return (
    <div>
      <main className={styles['content']}>
        <div className={styles['content-title']}>
          <h2 className={styles['content-title-med']}>Медицинский центр</h2>
          <div className={styles['content-title-medical-online']}>
            <h2 className={styles['content-title-medical']}>Medical</h2>
            <h2 className={styles['content-title-online']}>ONLINE</h2>
          </div>
        </div>

        <div className={styles['content-cards']}>
          <ul className={styles['content-card-list']}>
            <li className={styles['content-card-item']}>
              <p className={styles['content-card-text']}>
                Амбулаторно-поликлинические услуги
              </p>
              <img
                className={styles['content-card-img']}
                src="../../assets/images/info-clinic-images/cart_1.png"
                alt=""
              ></img>
            </li>

            <li className={styles['content-card-item']}>
              <p className={styles['content-card-text']}>
                Центр лучевой диагностики
              </p>
              <img
                className={styles['content-card-img']}
                src="../../assets/images/info-clinic-images/cart_2.png"
                alt=""
              ></img>
            </li>

            <li className={styles['content-card-item']}>
              <p className={styles['content-card-text']}>
                Собственная высокоточная лаборатория
              </p>
              <img
                className={styles['content-card-img']}
                src="../../assets/images/info-clinic-images/cart_3.png"
                alt=""
              ></img>
            </li>
          </ul>
        </div>

        <div className={styles['content-equipment']}>
          <div className={styles['content-equipment-wrap']}>
            <h4 className={styles['content-equipment-title']}>
              Наше оборудование:
            </h4>
            <ol className={styles['content-equipment-list']}>
              <li className={styles['content-equipment-item']}>
                КТ - Revolution EVO.
              </li>
              <li className={styles['content-equipment-item']}>
                Маммограф Senographe Crystal Nova.
              </li>
              <li className={styles['content-equipment-item']}>
                Рентгенаппарат Philips CombiDiagnost R90.
              </li>
              <li className={styles['content-equipment-item']}>
                Конусно-лучевая компьютерная томография (КЛКТ) Planmeca ProMax
                3D Plus (d20х10) смX.
              </li>
              <li className={styles['content-equipment-item']}>
                Дентальный рентген Planmeca ProX.
              </li>
              <li className={styles['content-equipment-item']}>
                С-Дуга OEC Elite II VASMTS.
              </li>
              <li className={styles['content-equipment-item']}>
                МРТ аппарат - SIGNA Explorer, 1,5Тл.
              </li>
            </ol>
          </div>
          <img
            src="../../assets/images/info-clinic-images/MRT.png"
            alt=""
            className={styles['content-equipment-img']}
          ></img>
        </div>

        <div className={styles['content-directions']}>
          <div className={styles['content-directions-wrap']}>
            <h3 className={styles['content-directions-title']}>
              Более 30 медицинских направлений:
            </h3>
            <ul className={styles['content-directions-list']}>
              <div className={styles['content-directions-list-wrap']}>
                <li className={styles['content-directions-item']}>
                  Акушерство
                </li>
                <li className={styles['content-directions-item']}>
                  Аллергология/Иммунология
                </li>
                <li className={styles['content-directions-item']}>
                  Вакцинирование
                </li>
                <li className={styles['content-directions-item']}>
                  Гастроэнтерология
                </li>
                <li className={styles['content-directions-item']}>
                  Гематология
                </li>
                <li className={styles['content-directions-item']}>
                  Дерматовенерология
                </li>
                <li className={styles['content-directions-item']}>
                  Диетология
                </li>
                <li className={styles['content-directions-item']}>
                  Кардиология
                </li>
                <li className={styles['content-directions-item']}>
                  Колопроктология
                </li>
              </div>
              <div className={styles['content-directions-list-wrap']}>
                <li className={styles['content-directions-item']}>
                  Лечебная физкультура
                </li>
                <li className={styles['content-directions-item']}>
                  Мануальная терапия
                </li>
                <li className={styles['content-directions-item']}>
                  Медицинский массаж
                </li>
                <li className={styles['content-directions-item']}>
                  Неврология
                </li>
                <li className={styles['content-directions-item']}>
                  Нефрология
                </li>
              </div>
              <div className={styles['content-directions-list-wrap']}>
                <li className={styles['content-directions-item']}>Онкология</li>
                <li className={styles['content-directions-item']}>
                  Стоматология/Ортодонтия
                </li>
                <li className={styles['content-directions-item']}>
                  Оториноларингология
                </li>
                <li className={styles['content-directions-item']}>
                  Семейная медицина
                </li>
              </div>
              <div className={styles['content-directions-list-wrap']}>
                <li className={styles['content-directions-item']}>
                  Психотерапия
                </li>
                <li className={styles['content-directions-item']}>
                  Психиатрия/Наркология
                </li>
                <li className={styles['content-directions-item']}>
                  Пульмонология
                </li>
                <li className={styles['content-directions-item']}>
                  Ревматология
                </li>
                <li className={styles['content-directions-item']}> Урология</li>
                <li className={styles['content-directions-item']}>
                  Физиотерапия
                </li>
                <li className={styles['content-directions-item']}>
                  Функциональная диагностика
                </li>
                <li className={styles['content-directions-item']}>Хирургия</li>
                <li className={styles['content-directions-item']}>
                  Эндоскопия
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div className={styles['content-research']}>
          <img
            src="../../assets/images/info-clinic-images/cart_3.png"
            alt=""
            className={styles['content-research-img']}
          ></img>
          <div className={styles['content-research-container']}>
            <h4 className={styles['content-research-title']}>
              Лабораторные исследования:
            </h4>
            <ol className={styles['content-research-title']}>
              <li className={styles['content-research-item']}>
                Общеклинические
              </li>
              <li className={styles['content-research-item']}>Биохимические</li>
              <li className={styles['content-research-item']}>
                Системы гемостаза
              </li>
              <li className={styles['content-research-item']}>Гормональные</li>
              <li className={styles['content-research-item']}>
                Цитологические
              </li>
              <li className={styles['content-research-item']}>
                Иммунологические
              </li>
              <li className={styles['content-research-item']}>Генетические</li>
              <li className={styles['content-research-item']}>
                Серологические
              </li>
              <li className={styles['content-research-item']}>
                Гематологические
              </li>
              <li className={styles['content-research-item']}>
                Бактериологические
              </li>
              <li className={styles['content-research-item']}>
                Микробиологические
              </li>
              <li className={styles['content-research-item']}>
                Определение онкомаркеров
              </li>
            </ol>
          </div>
        </div>

        <div className={styles['content-gallery']}>
          <ul className={styles['content-gallery-list']}>
            <li className={styles['content-gallery-item']}>
              <img
                src="../../assets/images/info-clinic-images/gallery_1.png"
                alt=""
                className={styles['content-gallery-img']}
              />
            </li>
            <li className={styles['content-gallery-item']}>
              <img
                src="../../assets/images/info-clinic-images/gallery_2.png"
                alt=""
                className={styles['content-gallery-img']}
              />
            </li>
            <li className={styles['content-gallery-item']}>
              <img
                src="../../assets/images/info-clinic-images/gallery_3.png"
                alt=""
                className={styles['content-gallery-img']}
              />
            </li>
            <li className={styles['content-gallery-item']}>
              <img
                src="../../assets/images/info-clinic-images/gallery_4.png"
                alt=""
                className={styles['content-gallery-img']}
              />
            </li>
            <li className={styles['content-gallery-item']}>
              <img
                src="../../assets/images/info-clinic-images/gallery_5.png"
                alt=""
                className={styles['content-gallery-img']}
              />
            </li>
            <li className={styles['content-gallery-item']}>
              <img
                src="../../assets/images/info-clinic-images/gallery_6.png"
                alt=""
                className={styles['content-gallery-img']}
              />
            </li>
            <li className={styles['content-gallery-item']}>
              <img
                src="../../assets/images/info-clinic-images/gallery_7.png"
                alt=""
                className={styles['content-gallery-img']}
              />
            </li>
            <li className={styles['content-gallery-item']}>
              <img
                src="../../assets/images/info-clinic-images/gallery_8.png"
                alt=""
                className={styles['content-gallery-img']}
              />
            </li>
            <li className={styles['content-gallery-item']}>
              <img
                src="../../assets/images/info-clinic-images/gallery_9.png"
                alt=""
                className={styles['content-gallery-img']}
              />
            </li>
          </ul>
        </div>

        <div className={styles['content-license']}>
          <h3 className={styles['content-license-title']}>Лицензии</h3>
          <div className={styles['content-license-wrap']}>
            <img
              src="../../assets/images/info-clinic-images/Licenziya_osnovnaya_na_med_deyat_19.03_(1).png"
              alt=""
              className={styles['content-license-img']}
            />
            <img
              src="../../assets/images/info-clinic-images/Licenziya_osnovnaya_na_med_deyat_19.03_(2).png"
              alt=""
              className={styles['content-license-img']}
            />
            <img
              src="../../assets/images/info-clinic-images/Licenziya_osnovnaya_na_med_deyat_19.03_(3).png"
              alt=""
              className={styles['content-license-img']}
            />
            <img
              src="../../assets/images/info-clinic-images/Licenziya_osnovnaya_na_med_deyat_19.03_(4).png"
              alt=""
              className={styles['content-license-img']}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default InfoClinic;
