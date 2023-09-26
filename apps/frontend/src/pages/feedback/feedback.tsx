import styles from './feedback.module.css';

function InfoClinic() {
  return (
    <div>
      <main className={styles['content']}>
        <div className={styles['content-title']}>
          <h3 className={styles['content-title-rewiews']}>Отзывы</h3>
        </div>

        <div className={styles['content-rewiews']}>
          <ul className={styles['content-rewiews-list']}>
            <li className={styles['content-rewiews-item']}>
              <h4 className={styles['content-rewiews-name']}>
                Галина Кошелева
              </h4>
              <p className={styles['content-rewiews-date']}>
                19 сентября 2023 г
              </p>
              <p className={styles['content-rewiews-doctor']}>
                Врач: Егорова Ирина Николаевна
              </p>
              <p className={styles['content-rewiews-comment']}>
                Комментарий: Этого специалиста я знаю давно. Поэтому я разыскала
                и приехала к ней. Профессиональный, очень внимательный врач.
                Может найти к пациенту подход. Доктор проконсультировала меня и
                дала правильные назначения. Выписала препарат, который я должна
                купить. Она будет мне делать уколы. Через неделю я приду на
                повторный прием. Этого специалиста я могла бы рекомендовать.
              </p>
            </li>

            <li className={styles['content-rewiews-item']}>
              <h4 className={styles['content-rewiews-name']}>Антон Рябов</h4>
              <p className={styles['content-rewiews-date']}>
                20 августа 2023 г
              </p>
              <p className={styles['content-rewiews-doctor']}>
                Врач: Семенов Роман Валерьевич
              </p>
              <p className={styles['content-rewiews-comment']}>
                Комментарий: Я недавно посетил врача-невролога Семенова Романа
                Валерьевича, и это был просто замечательный прием! Уже давно не
                встречал такого доктора, который настолько внимательно относится
                к своим пациентам и действительно пытается разобраться в их
                проблемах. Огромное спасибо ему за его профессионализм и заботу!
              </p>
            </li>

            <li className={styles['content-rewiews-item']}>
              <h4 className={styles['content-rewiews-name']}>
                Александр Соловьёв
              </h4>
              <p className={styles['content-rewiews-date']}>21 июля 2023 г</p>
              <p className={styles['content-rewiews-doctor']}>
                Врач: Семенов Роман Валерьевич
              </p>
              <p className={styles['content-rewiews-comment']}>
                Комментарий: Я хотел бы выразить огромную благодарность доктору
                Семенову Роману Валерьевичу, неврологу, за его доброту,
                отзывчивость и профессионализм при работе со мной. Было так
                приятно иметь дело с таким специалистом, что я точно планирую
                обратиться к нему снова в случае необходимости и обязательно
                порекомендую его своим друзьям!
              </p>
            </li>

            <li className={styles['content-rewiews-item']}>
              <h4 className={styles['content-rewiews-name']}>Евгений Козлов</h4>
              <p className={styles['content-rewiews-date']}>
                19 февраля 2023 г
              </p>
              <p className={styles['content-rewiews-doctor']}>
                Врач: Семенов Роман Валерьев
              </p>
              <p className={styles['content-rewiews-comment']}>
                Комментарий: Спасибо огромное Доктору за адекватность и
                искренние эмоции во время общения с пациентом - я уже отчаялась
                в поисках своего врача! Надеюсь, наше сотрудничество будет
                долгим и плодотворным (честно, миллион благодарностей и всего
                самого-самого!!)
              </p>
            </li>

            <li className={styles['content-rewiews-item']}>
              <h4 className={styles['content-rewiews-name']}>Ольга Елисеева</h4>
              <p className={styles['content-rewiews-date']}>
                02 февраля 2023 г
              </p>
              <p className={styles['content-rewiews-doctor']}>
                Врач: Егорова Ирина Николаевна
              </p>
              <p className={styles['content-rewiews-comment']}>
                Комментарий: На приеме была с мужем. У данного специалиста
                лечились ранее. Ирина Николаевна очень внимательно провела
                обследование. Сделала УЗИ необходимых суставов. Поставила
                блокаду на ноге и боль ушла. Так же поговорила с нами. Прописала
                лекарства и направила на анализы. Врачом очень довольны!
                Наконец-то нашли ее! Рекомендую! Доктор молодец! Общается строго
                и по делу. Добрая! Специалист высокого класса! Знает свое дело
                досконально.
              </p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default InfoClinic;
