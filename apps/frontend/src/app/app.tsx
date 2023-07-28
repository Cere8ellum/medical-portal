import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import { Container } from '@mui/material';

export function App() {
  function toggleDrawer(anchor: string, arg1: boolean): React.MouseEventHandler<HTMLButtonElement> | undefined {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <Header></Header>
      <Container sx={{margin:"0 auto"}}>
      <Content></Content>
      </Container>
     <Footer></Footer>
    </div>
  );
}

export default App;
