import MuiSnackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { observer } from 'mobx-react';
import { snackbarStore } from '../stores';
import Alert from './Alert';

const Snackbar: React.FC<SnackbarProps> = (props) => {
  const { message, severity } = snackbarStore.getContent();

  return (
    <MuiSnackbar
      open={snackbarStore.isOpen()}
      onClose={snackbarStore.handleClose}
      {...props}
    >
      <Alert
        onClose={snackbarStore.handleClose}
        severity={severity}
        sx={{ width: '100%', maxWidth: '400px' }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default observer(Snackbar);
