import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
