import * as React from 'react';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from 'react';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Modal from '@mui/material/Modal';
import { useReactToPrint } from 'react-to-print';
import styles from '../styles/modal.module.css';

export interface PropsType {
  props: any;
}
export interface RefType {
  handleOpen: () => void;
}

function BasicModal(props: any, ref: React.Ref<RefType>) {
  const printRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ ...props });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getOpinion = () => setData(props);
  useEffect(() => {
    getOpinion();
  }, [handleOpen]);

  useImperativeHandle(ref, () => ({
    handleOpen,
    getOpinion,
  }));

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    // bodyClass: '.modal',
    // pageStyle: `modal {
    //   max-width: 100%;
    //   background-color: red;
    // }`,
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles['modal']} ref={printRef}>
          <header className={styles['header']}>
            <div className={styles['header-wrapper']}>
              <div className={styles['header-title']}>
                <span className={styles['header-title-medical']}>Medical</span>
                <span className={styles['header-title-online']}>ONLINE</span>
              </div>

              <div className={styles['consult-header']}>
                <span className={styles['consult-title']}>
                  Консультативное заключение
                </span>
              </div>
            </div>
            <ul className={styles['consult-date-list']}>
              <li className={styles['consult-date-item']}>
                <p className={styles['consult-date-text']}>
                  Дата: {dayjs(data?.props?.time_start).format('DD.MM.YYYY')}
                </p>
              </li>
              <li className={styles['consult-date-item']}>
                <p className={styles['consult-date-text']}>
                  Время: {dayjs(data?.props?.time_start).format('HH:mm')}
                </p>
              </li>
            </ul>
          </header>
          <div className={styles['wrapper']}>
            <div className={styles['fio-title']}>ФИО:&nbsp;</div>
            <div className={styles['fio-text']}>{data?.props?.patient} </div>
          </div>
          <div className={styles['wrapper-complaint']}>
            <div className={styles['complaint-title']}>
              Жалобы/протокол исследования:
            </div>
            <div className={styles['complaint-text']}>
              {data?.props?.opinion?.patient_complaint}
            </div>
          </div>
          <div className={styles['wrapper-disease']}>
            <div className={styles['disease-title']}>Заключение/диагноз:</div>
            <div className={styles['disease-text']}>
              {data.props?.opinion?.disease_conclusion}
            </div>
          </div>
          <div className={styles['wrapper-treatment']}>
            <div className={styles['treatment-title']}>
              План обследования и лечения:
            </div>
            <div className={styles['treatment-text']}>
              {data.props?.opinion?.treatment_plan}
            </div>
          </div>
          <div className={styles['wrapper-doctor']}>
            <div className={styles['d-flex']}>
              <div className={styles['doctor-title']}>Доктор:&nbsp;</div>
              <div className={styles['doctor-fio']}>{data.props?.doctor}</div>
            </div>
            <div className={styles['doctor-spec']}>
              Врач-{data.props?.speciality}
            </div>
          </div>
          <button className={styles['report-btn-print']} onClick={handlePrint}>
            ПЕЧАТЬ
          </button>
        </Box>
      </Modal>
    </div>
  );
}
export default forwardRef(BasicModal);
