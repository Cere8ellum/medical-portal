import { Box, BoxProps, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { User } from './PatientSearchForm';

interface Props {
  user: User;
  hide: () => void;
}

const PatientInfo: React.FC<Props & BoxProps> = ({
  user: { firstname, lastname, birthdate },
  hide,
  sx,
}) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...sx,
    }}
  >
    <IconButton sx={{ position: 'absolute', top: 0, left: 0 }} onClick={hide}>
      <ArrowBackIcon sx={{ width: '20px', height: '20px' }} />
    </IconButton>
    <Typography variant="h5" align="center">
      {`${firstname} ${lastname}, ${birthdate}`}
    </Typography>
  </Box>
);

export default PatientInfo;
