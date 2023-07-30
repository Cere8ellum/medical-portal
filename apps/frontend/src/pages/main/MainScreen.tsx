import { Container } from '@mui/material';
import MainLayout from '../../app/MainLayout';
import MainContent from './components/MainContent';

const MainScreen = () => {
  return (
    <MainLayout>
      <Container sx={{ maxWidth: '1345px !important' }} disableGutters>
        <MainContent />
      </Container>
    </MainLayout>
  );
};

export default MainScreen;
