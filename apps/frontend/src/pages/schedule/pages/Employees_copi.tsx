import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Toolbar, TableRow, TableCell } from '@mui/material';

const headCells = [
  { id: 'startDate', label: 'Даты начало отсутствия' },
  { id: 'department', label: 'Причина отсутстия' },
  { id: 'actions', label: 'Кнопки редактирования', disableSorting: true },
];

export default function Body() {
  return (
    <section id="content-section" className="">
      {}
      <div className="content ">
        <div className="hero-content-three">
          <div className="content-form">
            <Toolbar>
              <button className="content-title-btn">+ Добавить</button>
            </Toolbar>

            <div className="">
              <TableRow key={''} className="">
                <TableCell>Даты начало отсутствия</TableCell>
                <TableCell>Причина отсутстия</TableCell>
                <TableCell>
                  <button className="reason-absence-delete">
                    Редактировать
                  </button>

                  <button className="reason-absence-delete">Удалить</button>
                </TableCell>
              </TableRow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
