import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FormEvent, useEffect, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import './style.scss';
import { useAppSelector, RootState, useAppDispatch } from 'store/store';
import { getUserById, updateUserById, deleteUserById, getUsers } from 'store/users/users-thunks';
import { IUsersState } from 'store/users/users-slice';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { logout } from 'store/auth/auth-slice';
import { useNavigate } from 'react-router';
import DeleteModal from './../../components/deleteModal';
import DeleteButton from 'pages/boards/DeleteButton';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

type User = {
  name: string;
  password: string;
  login: string;
};

const User = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, SetUser] = useState<User>({ name: '', login: '', password: '' });
  const [open, setOpen] = useState<boolean>(false);
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const userState: IUsersState = useAppSelector((state: RootState) => state.rootReducer.usersReducer);
  const dispatch = useAppDispatch();
  const onSigninSubmit = async (): Promise<void> => {
    handleClose();
    SetUser({ name: '', login: '', password: '' });
    await dispatch(updateUserById({ userId, ...user }));
    await dispatch(getUserById(userId));
  };
  const handleClose = () => {
    setOpen((open) => !open);
  };

  const oneUserIsUpdating = useSelector((state: RootState) => state.rootReducer.usersReducer.updateUserLoading);
  const oneUserIsGetting = useSelector((state: RootState) => state.rootReducer.usersReducer.userByIdLoading);
  const oneUserIsDeleting = useSelector((state: RootState) => state.rootReducer.usersReducer.deleteUserLoading);
  const allUsersIsGetting = useSelector((state: RootState) => state.rootReducer.usersReducer.usersLoading);
  const userIsLoading = oneUserIsUpdating || oneUserIsGetting || oneUserIsDeleting || allUsersIsGetting;

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  function deleteUser() {
    (async () => {
      dispatch(deleteUserById(userId));
    })()
      .then(() => dispatch(logout()))
      .then(() => {
        navigate('/', { replace: true });
      });
  }
  return (
    <Box className="userPage" sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid
        item
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: { sm: '500px', xs: '300px' },
          minWidth: { sm: '500px', xs: '300px' },
          padding: '20px',
        }}
        component={Paper}
        square
      >
        {' '}
        {userIsLoading ? (
          <Grid container className="board__loading">
            <CircularProgress color="primary" />
            <Typography className="board__loading-title" variant="h4">
              {t('loading')}
            </Typography>
          </Grid>
        ) : (
          <>
            <Typography variant="h4" component="h2" sx={{ alignSelf: 'center', fontFamily: 'monospace' }}>
              {t('user.data')}
            </Typography>
            {userState.userById ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Typography variant="h6" sx={{ mr: '10px', fontFamily: 'monospace' }}>
                    {t('user.name')}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: { xs: '17px', sm: 'inherit' }, display: 'flex', alignItems: 'center' }}
                  >
                    {' '}
                    {userState.userById.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Typography variant="h6" component="h5" sx={{ mr: '10px', fontFamily: 'monospace' }}>
                    {t('user.login')}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontSize: { xs: '17px', sm: 'inherit' }, display: 'flex', alignItems: 'center' }}
                  >
                    {' '}
                    {userState.userById.login}
                  </Typography>
                </Box>
              </>
            ) : (
              <></>
            )}
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Typography variant="h6" sx={{ mr: '10px', fontFamily: 'monospace' }}>
                Id:
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: '17px', sm: 'inherit' }, display: 'flex', alignItems: 'center' }}
              >
                {' '}
                {userId}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignSelf: 'center' }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ margin: '10px', padding: '10px', borderRadius: '32px', width: 'auto' }}
                onClick={handleClose}
              >
                {t('user.edit')}
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('header.edit')}</DialogTitle>
                <DialogContent>
                  <ValidatorForm
                    className="userPage__form"
                    onError={(errors) => console.log(errors)}
                    onSubmit={onSigninSubmit}
                    noValidate
                  >
                    <TextValidator
                      variant="outlined"
                      sx={{ width: '100%' }}
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label={t('user.name')}
                      name="name"
                      autoComplete={t('user.name')}
                      autoFocus
                      value={user.name}
                      validators={[
                        'required',
                        'minStringLength:3',
                        'maxStringLength:12',
                        'matchRegexp:^[a-zA-Zа-яА-Я]+$',
                      ]}
                      errorMessages={[
                        t('user.errorRequired'),
                        t('user.errorLength', {
                          itemRu: 'Имя',
                          item: 'Name',
                          should: 'should',
                          shouldRu: 'должно',
                          minCount: '2',
                          maxCount: '13',
                        }),
                        t('user.errorLength', {
                          itemRu: 'Имя',
                          item: 'Name',
                          should: 'should',
                          shouldRu: 'должно',
                          minCount: '2',
                          maxCount: '13',
                        }),
                        t('user.errorLetters'),
                      ]}
                      onChange={(e: FormEvent<HTMLFormElement>) => {
                        SetUser({ ...user, name: (e.target as HTMLInputElement).value });
                      }}
                    />
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="login"
                      label={t('user.login')}
                      name="login"
                      autoComplete={t('user.login')}
                      autoFocus
                      value={user.login}
                      validators={[
                        'required',
                        'minStringLength:3',
                        'maxStringLength:12',
                        'matchRegexp:^[a-zA-Zа-яА-Я]+$',
                      ]}
                      errorMessages={[
                        t('user.errorRequired'),
                        t('user.errorLength', {
                          itemRu: 'Логин',
                          item: 'Login',
                          should: 'should',
                          shouldRu: 'должен',
                          minCount: '2',
                          maxCount: '13',
                        }),
                        t('user.errorLength', {
                          itemRu: 'Логин',
                          item: 'Login',
                          should: 'should',
                          shouldRu: 'должен',
                          minCount: '2',
                          maxCount: '13',
                        }),
                        t('user.errorLetters'),
                      ]}
                      onChange={(e: FormEvent<HTMLFormElement>) => {
                        SetUser({ ...user, login: (e.target as HTMLInputElement).value });
                      }}
                    />
                    <TextValidator
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label={t('user.password')}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={user.password}
                      validators={['required', 'minStringLength:8', 'maxStringLength:15']}
                      errorMessages={[
                        t('user.errorRequired'),
                        t('user.errorLength', {
                          itemRu: 'Пароль',
                          item: 'Password',
                          should: 'should',
                          shouldRu: 'должен',
                          minCount: '7',
                          maxCount: '16',
                        }),
                        t('user.errorLength', {
                          itemRu: 'Пароль',
                          item: 'Password',
                          should: 'should',
                          shouldRu: 'должен',
                          minCount: '7',
                          maxCount: '16',
                        }),
                      ]}
                      onChange={(e: FormEvent<HTMLFormElement>) => {
                        SetUser({ ...user, password: (e.target as HTMLInputElement).value });
                      }}
                    />
                    <Button sx={{ color: 'black' }} onClick={handleClose}>
                      {t('boards.cancel')}
                    </Button>
                    <Button sx={{ color: 'black' }} type="submit">
                      {t('user.submit')}
                    </Button>
                  </ValidatorForm>
                </DialogContent>
              </Dialog>
              <DeleteModal message={t('user.message')} submit={deleteUser} deleteButton={DeleteButton} />
            </Box>
          </>
        )}
      </Grid>
    </Box>
  );
};
export default User;
