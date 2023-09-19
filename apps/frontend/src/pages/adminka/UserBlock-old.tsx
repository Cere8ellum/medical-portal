import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import api from '../../infrastructure/api';

import axios from 'axios';
import clsx from 'clsx';

// function createData(name, username, email, phone, website) {
//   return { name, username, email, phone, website };
// }

function UserBlock() {
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const fetchUsers = async function getUser() {
      try {
        const response = await api.get(`user/admin/users/`);
        console.log('users', response.data.users);
        setUsersData(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="right">Имя</TableCell>
            <TableCell align="right">Фамилия</TableCell>
            <TableCell align="right">Дата рождения</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Пол</TableCell>
            <TableCell align="right">Адрес</TableCell>
            <TableCell align="right">Телефон</TableCell>
            <TableCell align="right">Роль</TableCell>
            <TableCell align="right">Статус</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((row: any) => (
            <TableRow key={row.password}>
              <TableCell align="right">{row?.firstname}</TableCell>
              <TableCell align="right">{row?.lastname}</TableCell>
              <TableCell align="right">{row?.birthdate}</TableCell>
              <TableCell align="right">{row?.email}</TableCell>
              <TableCell align="right">{row?.gender}</TableCell>
              <TableCell align="right">{row?.address}</TableCell>
              <TableCell align="right">{row?.mobile}</TableCell>
              <TableCell align="right">{row?.role}</TableCell>
              <TableCell align="right">{row?.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserBlock;
