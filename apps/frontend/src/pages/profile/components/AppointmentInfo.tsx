import React, { useEffect, useState } from 'react';
import api from '../../../infrastructure/api';

export const AppointmentInfo = () => {
  const userId = 139;
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
    getAppInfo();
  }, []);
  async function getAppInfo() {
    try {
      const response = await api.get(`appointments/patient/${userId}`);
      setAppList(response.data);
      console.log('appList', appList);
    } catch (error) {
      console.error(error);
    }
  }

  const listItems = appList.map((item: any) => (
    <li key={item.id}>
      <p>
        <b>{item.doctor}</b>
        <b>{item.date}</b>
        <b>{item.status}</b>
      </p>
    </li>
  ));
  return <ul>{listItems}</ul>;
};
