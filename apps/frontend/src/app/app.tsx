import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainScreen from '../pages/main';
import AppointmentScreen from '../pages/appointment';
import { Profile } from '../pages/profile/components/Profile';
import { SignupScreen } from '../pages/signup';

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
      <Route path="/registration" element={<SignupScreen />} />
      <Route path="/appointment" element={<AppointmentScreen />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
