import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  message: string;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationDialog: React.FC<Props> = ({
  message,
  open,
  onConfirm,
  onClose,
}) => {
  const handleOk = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      PaperProps={{
        sx: {
          width: '519px',
          padding: '25px 31px',
          rowGap: '30px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <DialogTitle variant="h5" sx={{ padding: 0, color: 'common.black' }}>
          Подтвердите действие
        </DialogTitle>
        <IconButton onClick={handleCancel}>
          <CloseIcon sx={{ width: '20px', height: '20px' }} />
        </IconButton>
      </Box>
      <DialogContent sx={{ padding: 0, overflow: 'initial' }}>
        <DialogContentText
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '13px',
            letterSpacing: '-0.14px',
          }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 0, justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          onClick={handleCancel}
          sx={{
            height: '40px',
            color: '#868e98',
            backgroundColor: '#ffffff',

            '&:hover': {
              backgroundColor: '#e2e2e2',
            },
          }}
        >
          Отменить
        </Button>
        <Button
          color="error"
          variant="contained"
          sx={{ height: '40px' }}
          onClick={handleOk}
        >
          Подтвердить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
