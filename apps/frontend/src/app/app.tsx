import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainScreen from '../pages/main';
import AppointmentScreen from '../pages/appointment';
import ProfileScreen from '../pages/profile/ProfileScreen';
import { SignupScreen } from '../pages/signup';
import LoginScreen from '../pages/auth/LoginScreen';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/appointment" element={<AppointmentScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
    </Routes>
  );
}

export default App;
