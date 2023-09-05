import AuthStore from './AuthStore';
import SnackbarStore from './SnackbarStore';

export const authStore = new AuthStore();
export const snackbarStore = new SnackbarStore();

export default { authStore, snackbarStore };
