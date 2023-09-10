import AuthStore from './AuthStore';
import SnackbarStore from './SnackbarStore';
import UserStore from './UserStore';

export const authStore = new AuthStore();
export const snackbarStore = new SnackbarStore();
export const userStore = new UserStore();

// injectStores({ userIdStore });

export default { authStore, snackbarStore, userStore };
