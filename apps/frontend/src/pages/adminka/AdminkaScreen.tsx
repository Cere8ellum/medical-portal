import React, { MouseEventHandler, useEffect, useState } from 'react';
import DoctorsFunctional from './components/DoctorForm/DoctorsFunctional';
import NavTag from './components/nav-tag';
import styles from './styles/adminka.module.css';
//import AppointmentTab from './AppointmentTab';
import ScheduleScreen from './components/ScheduleForm/ScheduleScreen';
import { authStore } from '../../stores';
import { useNavigate } from 'react-router-dom';
import AppointmentTab from './components/AppointmentTab/AppointmentTab';

interface AdminkaTab {
  title: string;
  block: React.FC | null;
}

// const ScheduleFunctional: React.FC = () => {
//   return <div>ScheduleFunctional</div>;
// };

const MessageFunctional: React.FC = () => {
  return <div>В планах реализовать позже.</div>;
};

const UsersFunctional: React.FC = () => {
  return <div>В планах реализовать позже.</div>;
};

const TabList: Array<AdminkaTab> = [
  { title: 'Appointments', block: AppointmentTab },
  { title: 'Schedule', block: ScheduleScreen },
  { title: 'Doctors', block: DoctorsFunctional },
  { title: 'Messages', block: MessageFunctional },
  { title: 'Users', block: UsersFunctional },
];

const AdminkaScreen: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<number | null>(1);

  const logout = async () => {
    try {
      await authStore.logout();
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const nav: HTMLElement | null = document.getElementById('nav');
    const tags = nav?.children;
    if (tags) {
      for (let i = 0; i < tags?.length; i++) {
        if (Number(tags[i].getAttribute('tabIndex')) === value) {
          tags[i].classList.add(`${styles['pointer']}`);
        } else {
          tags[i].classList.remove(`${styles['pointer']}`);
        }
      }
    }
  }, [value]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const key = event.currentTarget.getAttribute('tabIndex');
    setValue(key ? Number(key) : null);
  };

  return (
    <main className={styles['container']}>
      <div id="nav" className={styles['nav']}>
        {TabList.map((tab: AdminkaTab, index: number) => {
          return (
            <NavTag
              title={tab.title}
              key={index + 1}
              handleClick={handleClick}
              index={index + 1}
            />
          );
        })}
        <img
          className={styles['logout']}
          src="./assets/images/adminka/logout.png"
          alt="logout"
          onClick={logout}
        />
      </div>
      <div className={styles['functional']}>
        {TabList.map((tab: AdminkaTab, index: number) => {
          return (
            <div
              key={index}
              style={{ display: value === index + 1 ? 'block' : 'none' }}
            >
              {tab.block ? <tab.block /> : null}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default AdminkaScreen;
