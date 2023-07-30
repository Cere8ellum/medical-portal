import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainScreen from '../pages/main';
import AppointmentScreen from '../pages/appointment';

export function App() {
  function toggleDrawer(
    anchor: string,
    arg1: boolean
  ): React.MouseEventHandler<HTMLButtonElement> | undefined {
    throw new Error('Function not implemented.');
  }

  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/appointment" element={<AppointmentScreen />} />
    </Routes>
  );
}

export default App;
