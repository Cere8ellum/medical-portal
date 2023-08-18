import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainScreen from '../pages/main';
import AppointmentScreen from '../pages/appointment';
import { Profile } from '../pages/profile/components/Profile';
import { SignupScreen } from '../pages/signup';
import ChangePassword from '../pages/changepassword/ChangePassword';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/appointment" element={<AppointmentScreen />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/changepassword" element={<ChangePassword />} />
    </Routes>
  );
}

export default App;
