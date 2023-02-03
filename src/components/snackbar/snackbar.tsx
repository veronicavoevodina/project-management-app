import { Alert, Snackbar } from '@mui/material';
import { ISnackBarState } from 'store/snackbar/snackbar-slice';
import { useAppSelector, RootState } from 'store/store';
import './snackbar.scss';

const SnackBar = () => {
  const snack: ISnackBarState = useAppSelector((state: RootState) => state.rootReducer.snackBarReducer);
  return (
    <>
      <Snackbar open={snack.open}>
        <Alert severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackBar;
