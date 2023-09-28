import React, { ChangeEvent, useEffect, useState, useRef } from 'react';
import api from '../../../infrastructure/api';
import styles from '../styles/appointmentinfo.module.css';
import TablePagination from '@mui/material/TablePagination';
import BasicModal, { RefType } from './Modal';
import CircularIndeterminate from './CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { userStore } from '../../../stores';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AppointmentInfo = () => {
  const userId = userStore.userId;
  const modalRef = useRef<RefType>(null);
  const [isFetching, setisFetching] = useState(false);
  const [reload, setReload] = useState(0);
  const [appList, setAppList] = useState([
    {
      date: '',
      doctor: '',
      id: null,
      patient: '',
      speciality: '',
      status: '',
    },
  ]);

  useEffect(() => {
    getAppInfo().then((res) => {
      setAppList(res);
      setTimeout(() => {
        setisFetching(true);
      }, 300);
    });
  }, [reload]);

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

  async function getAppInfo() {
    try {
      console.log('userId', userId);
      const response = await api.get(`appointments/patient/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function removeAppointment(itemId: any) {
    try {
      const response = await api.delete(`appointments/${itemId}`);
      return response.status;
    } catch (error) {
      console.error(error);
    }
  }

  const [page, setPage] = useState(0);
  const [item, setItem] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    setCurrentPage(rowsPerPage * newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    setCurrentPage(0);
  };

  const showResult = (e: any) => {
    setItem(e);
    if (modalRef.current) {
      modalRef.current.handleOpen();
    }
  };

  const cancelSign = (itemId: any) => {
    removeAppointment(itemId).then((res) => {
      if (res === 200) {
        setOpen(true);
        setReload(reload + 1);
      }
    });
  };

  console.log('appList', appList);
  const listItems = appList
    .map((item: any) => (
      <div className={styles['container-cell']} key={Math.random()}>
        <div className={styles['cell']}>{item.doctor}</div>
        <div className={styles['cell']}>{item.date}</div>
        <div className={styles['cell']}>{item.time}</div>
        <div className={styles['cell']}>{item.status}</div>
        <div className={styles['cell']}>
          {item.status === 'Completed' ? (
            <span
              className={styles['btn-result']}
              onClick={() => showResult(item)}
            >
              Заключение
            </span>
          ) : (
            ''
          )}
        </div>
        {item.status === 'Waiting' ? (
          <div
            className={styles['cancelled-btn']}
            onClick={() => cancelSign(item.id)}
          >
            Отменить
          </div>
        ) : (
          <div className={styles['cell']}></div>
        )}
      </div>
    ))
    .slice(currentPage, currentPage + rowsPerPage);

  return (
    <section>
      {isFetching ? (
        <>
          <div className={styles['container-header']}>
            <div className={styles['title']}>ВРАЧ Ф.И.О.</div>
            <div className={styles['title']}>ДАТА ВИЗИТА</div>
            <div className={styles['title']}>ВРЕМЯ ВИЗИТА</div>
            <div className={styles['title']}>СТАТУС ЗАПИСИ</div>
            <div className={styles['title']}>РЕЗУЛЬТАТ ВИЗИТА</div>
            <div className={styles['title']}></div>
          </div>
          {listItems}
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
            component="div"
            count={appList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={<span>Выводить записей: </span>}
            labelDisplayedRows={({ page }) => {
              return `Страница: ${page + 1}`;
            }}
          />
          <BasicModal ref={modalRef} props={item}></BasicModal>
          <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
            >
              Запись отменена
            </Alert>
          </Snackbar>
        </>
      ) : (
        <div
          style={{
            width: '100%',
            height: '30vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularIndeterminate></CircularIndeterminate>
        </div>
      )}
    </section>
  );
};
