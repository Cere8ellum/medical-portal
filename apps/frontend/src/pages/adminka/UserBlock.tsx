// import './styles.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import api from '../../infrastructure/api';
// import PhoneInput from 'react-phone-input-2';
import { Box, Button, IconButton, TextField } from '@mui/material';

// import 'react-phone-input-2/lib/style.css';

const routes = [
  {
    label: 'Home',
    roles: ['ADMIN', 'USER'],
  },
  {
    label: 'About',
    roles: ['ADMIN', 'USER'],
  },
  {
    label: 'Panel',
    roles: ['ADMIN'],
  },
];

export default function App() {
  type users = {
    id: number;
    firstname: string;
    lastname: string;
    gender: string;
    birthdate: string;
    email: string;
    mobile: string;
    role: string;
    status: string;
  };
  const [users, setUsers] = useState([]);
  const [editRow, setEditRow] = useState(0);
  const [editData, setEditData] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    birthdate: '',
    email: '',
    address: '',
    mobile: '',
    role: '',
    status: '',
  });

  const role = 'USER';

  const getUsers = async () => {
    try {
      const response = await api.get(`user/admin/users/`);
      setUsers(response.data.users);
      console.log('users', users);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((item: { id: number }) => item.id !== id));
  };

  const setEdited = (id: number) => {
    setEditRow(id);
    const {
      firstname,
      lastname,
      gender,
      birthdate,
      email,
      address,
      mobile,
      role,
      status,
    }: any = users.find((item: { id: number }) => item.id === id);
    setEditData({
      ...editData,
      firstname,
      lastname,
      gender,
      birthdate,
      email,
      address,
      mobile,
      role,
      status,
    });
  };

  const save = () => {
    const index = users.findIndex(
      (item: { id: number }) => item.id === editRow
    );
    console.log('index', index);
    console.log('editData', editData);
    const newUsers: any = [...users];
    const newUser = { ...newUsers[index], ...editData };
    newUsers[index] = newUser;
    console.log('newUsers', newUsers);
    setUsers(newUsers);
    setEditRow(0);
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(editRow);

  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ padding: '0 5px' }}>
                id
              </TableCell>
              <TableCell align="left" sx={{ padding: '0 5px' }}>
                Имя
              </TableCell>
              <TableCell align="left" sx={{ padding: '0 5px' }}>
                Фамилия
              </TableCell>
              <TableCell align="left" sx={{ padding: '0 5px' }}>
                Пол
              </TableCell>
              <TableCell align="left" sx={{ padding: '0 5px', minWidth: 150 }}>
                Дата рождения
              </TableCell>
              <TableCell align="left" sx={{ padding: '0 5px' }}>
                email
              </TableCell>
              <TableCell align="left" sx={{ padding: '0 5px' }}>
                Адрес
              </TableCell>
              <TableCell align="left" sx={{ padding: '0 5px' }}>
                телефон
              </TableCell>
              <TableCell align="left" sx={{ padding: '0 5px' }}>
                Роль
              </TableCell>
              <TableCell align="left" sx={{ padding: '0 5px' }}>
                Статус
              </TableCell>
              <TableCell
                align="left"
                sx={{ padding: '0 5px', minWidth: 100 }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item: any) => (
              <TableRow
                key={item?.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ padding: '0 5px' }}>
                  {item.id}
                </TableCell>
                {item.id === editRow ? (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    <TextField
                      onChange={(e) =>
                        setEditData({ ...editData, firstname: e.target.value })
                      }
                      value={editData.firstname}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    {item.firstname}
                  </TableCell>
                )}
                {item.id === editRow ? (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    <TextField
                      onChange={(e) =>
                        setEditData({ ...editData, lastname: e.target.value })
                      }
                      value={editData.lastname}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    {item.lastname}
                  </TableCell>
                )}
                {item.id === editRow ? (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    <TextField
                      onChange={(e) =>
                        setEditData({ ...editData, gender: e.target.value })
                      }
                      value={editData.gender}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    {item.gender}
                  </TableCell>
                )}
                {item.id === editRow ? (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    <TextField
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          birthdate: e.target.value,
                        })
                      }
                      value={editData.birthdate}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    {item.birthdate}
                  </TableCell>
                )}
                {item.id === editRow ? (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    <TextField
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          email: e.target.value,
                        })
                      }
                      value={editData.email}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    {item.email}
                  </TableCell>
                )}
                {item.id === editRow ? (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    <TextField
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          address: e.target.value,
                        })
                      }
                      value={editData.address}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    {item.address}
                  </TableCell>
                )}
                {item.id === editRow ? (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    <TextField
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          mobile: e.target.value,
                        })
                      }
                      value={editData.mobile}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    {item.mobile}
                  </TableCell>
                )}
                {item.id === editRow ? (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    <TextField
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          role: e.target.value,
                        })
                      }
                      value={editData.role}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    {item.role}
                  </TableCell>
                )}
                {item.id === editRow ? (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    <TextField
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          status: e.target.value,
                        })
                      }
                      value={editData.status}
                    />
                  </TableCell>
                ) : (
                  <TableCell align="left" sx={{ padding: '0 5px' }}>
                    {item.status}
                  </TableCell>
                )}

                <TableCell align="left" sx={{ padding: '0 5px' }}>
                  <IconButton onClick={() => deleteUser(item.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                  {item.id === editRow ? (
                    <IconButton onClick={save} size="small">
                      <CheckIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => setEdited(item.id)} size="small">
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
