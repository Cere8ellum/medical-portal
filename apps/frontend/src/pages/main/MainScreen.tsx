import { Container } from '@mui/material';
import MainContent from './components/MainContent';

const MainScreen = () => {
  return (
    <Container sx={{ maxWidth: '1345px !important' }} disableGutters>
      <MainContent />
    </Container>
  );
};

export default MainScreen;
