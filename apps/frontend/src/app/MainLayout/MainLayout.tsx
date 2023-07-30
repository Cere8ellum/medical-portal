import { ReactNode } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';

interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
