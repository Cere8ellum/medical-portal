import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from '@material-ui/core';
import useTable from './components/useTable';
import * as employeeService from './employeesService';
import Popup from './components/Popup';
import Notification from './components/Notification';
import ConfirmDialog from './components/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
  newButton: {
    position: 'absolute',
    right: '10px',
  },
}));

const headCells = [
  { id: 'startDate', label: 'Даты начало отсутствия' },
  { id: 'department', label: 'Причина отсутстия' },
  { id: 'actions', label: 'Кнопки редактирования', disableSorting: true },
];

export default function Employees() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == '') return items;
        else
          return items.filter((x) =>
            x.startDate.toLowerCase().includes(target.value)
          );
        return items.filter((x) =>
          x.hireDate.toLowerCase().includes(target.value)
        );
      },
    });
  };

  const addOrEdit = (employee, resetForm) => {
    if (employee.id == 0) employeeService.insertEmployee(employee);
    else employeeService.updateEmployee(employee);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: 'Запись добавили',
      type: 'success',
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    employeeService.deleteEmployee(id);
    setRecords(employeeService.getAllEmployees());
    setNotify({
      isOpen: true,
      message: 'Запись удалена',
      type: 'error',
    });
  };

  return (
    <>
      <section id="content-section" className="">
        {}
        <div className="content ">
          <div className="hero-content-three">
            <div className="content-top ">
              <div className="content-nav">
                <a
                  className="content-nav-item content-nav-btn header-nav-link"
                  href="#"
                >
                  Личные данные
                </a>
                <a
                  className="content-nav-item content-nav-btn header-nav-link reception "
                  href="#"
                >
                  Приемы
                </a>
                <a
                  className="content-nav-item content-nav-active content-nav-btn header-nav-link timetable persdata-active"
                  href="#"
                >
                  График отсутствия
                </a>
              </div>
              <h3 className="content-title">Личный кабинет врача</h3>
            </div>

            <div className="content-form">
              <h6 className="content-title-absent">График отсутствия врача</h6>
              <Toolbar>
                <button
                  className="content-title-btn"
                  onClick={() => {
                    setOpenPopup(true);
                    setRecordForEdit(null);
                  }}
                >
                  + Добавить
                </button>
              </Toolbar>

              <TblContainer className="persdata-field-wrap-three-list persdata-field-three-date">
                <TableBody>
                <TblHead />
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id} className="">
                    <TableCell>{item.startDate}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>
                      <button
                        className="reason-absence-delete"
                        onClick={() => {
                          openInPopup(item);
                        }}
                      >
                        Редактировать
                      </button>

                      <button
                        className="reason-absence-delete"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: 'Вы уверены, что хотите удалить эту запись?',
                            onConfirm: () => {
                              onDelete(item.id);
                            },
                          });
                        }}
                      >
                        Удалить
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </TblContainer>
              <TblPagination />
            </div>

            <Popup
              title="Добавить причину отсутствия"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <EmployeeForm
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
              />
            </Popup>

            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
          </div>
        </div>
      </section>
    </>
  );
}
