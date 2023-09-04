import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainScreen from '../pages/main';
import AppointmentScreen from '../pages/appointment';
import ProfileScreen from '../pages/profile/ProfileScreen';
import { SignupScreen } from '../pages/signup';
import LoginScreen from '../pages/auth/LoginScreen';
import DoctorListScreen from '../pages/doctor_list/DoctorListScreen';
import ChangePassword from '../pages/changepassword/ChangePassword';
import OpinionForm from '../pages/opinion/opinion_form';
import OpinionDocument from '../pages/opinion/opinion_doc';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/appointment" element={<AppointmentScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/doctors" element={<DoctorListScreen />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/opinion/:appointmentId" element={<OpinionDocument />} />
      <Route path="/opinionform/:appointmentId" element={<OpinionForm />} />
    </Routes>
  );
}

export default App;
