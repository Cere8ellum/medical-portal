import { Box, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormWrapper from '../FormWrapper';

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: string | JSX.Element | JSX.Element[];
}

const AppointmentModal = ({ open, title, onClose, children }: Props) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.80)',
            backdropFilter: 'blur(3px)',
          },
        },
      }}
    >
      <FormWrapper>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">{title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon
              sx={{
                width: '20px',
                height: '20px',
              }}
            />
          </IconButton>
        </Box>
        {children}
      </FormWrapper>
    </Modal>
  );
};

export default AppointmentModal;
