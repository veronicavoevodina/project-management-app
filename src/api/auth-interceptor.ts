import { logout } from 'store/auth/auth-slice';
import { hideMessage, showMessage } from 'store/snackbar/snackbar-slice';
import { StoreType } from 'store/store';
import api from './api';

export const authInterceptor = (
  store: StoreType,
  translation: {
    success: string;
    error401: string;
    error403: string;
    error409: string;
  }
) => {
  api.interceptors.request.use(
    (conf) => {
      store.dispatch(hideMessage());
      if (store.getState().rootReducer.authReducer.token) {
        conf.headers['Authorization'] = `Bearer ${store.getState().rootReducer.authReducer.token}`;
      }
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (next) => {
      store.dispatch(showMessage({ open: true, message: next.statusText || translation.success, severity: 'success' }));
      setTimeout(() => {
        store.dispatch(hideMessage());
      }, 5000);
      return Promise.resolve(next);
    },
    (error) => {
      let message = error?.response.data.message || error.message;
      if (error.response.status === 401) {
        message = translation.error401;
      }
      if (error.response.status === 403) {
        message = translation.error403;
      }
      if (error.response.status === 409) {
        message = translation.error409;
      }
      store.dispatch(showMessage({ open: true, message, severity: 'error' }));
      setTimeout(() => {
        store.dispatch(hideMessage());
      }, 5000);
      if (error.response.status === 401 || error.response.status === 403) {
        store.dispatch(logout());
        localStorage.clear();
      }
      return Promise.reject(error);
    }
  );
};
