import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { signIn } from 'store/auth/auth-thunks';
import './signInPage.scss';
import { IAuthState } from 'store/auth/auth-slice';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

interface ISignInForm {
  login: string;
  password: string;
}

const SignInPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth: IAuthState = useAppSelector((state: RootState) => state.rootReducer.authReducer);
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<ISignInForm>({ login: '', password: '' });
  const onSigninSubmit = () => {
    dispatch(signIn(formValues))
      .unwrap()
      .then(() => {
        navigate('/boards', { replace: true });
      });
  };

  function onFormChange(e: FormEvent<HTMLFormElement>) {
    const field = (e.target as HTMLInputElement).id;
    const value = (e.target as HTMLInputElement).value;
    setFormValues((formValues) => {
      return {
        ...formValues,
        [field]: value,
      };
    });
  }

  return (
    <Box className="signin-container">
      <Grid
        item
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: { xs: '300px', md: '500px' },
          height: { xs: '300px', md: '370px' },
          padding: '20px',
        }}
        component={Paper}
        square
        className="signin"
      >
        <ValidatorForm
          onSubmit={onSigninSubmit}
          onChange={onFormChange}
          noValidate
          sx={{ width: { xs: '240px', md: '400px' }, display: 'flex', justifyContent: 'center' }}
        >
          <Typography textAlign="center" variant="h5" component="h2" sx={{ fontFamily: 'monospace' }}>
            {t('auth.signIn')}
          </Typography>
          <TextValidator
            autoComplete="off"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label={t('user.login')}
            name="login"
            autoFocus
            value={formValues.login}
            validators={['required']}
            errorMessages={[t('user.errorRequired'), t('user.errorSignIn')]}
            disabled={auth.signInLoading}
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
            autoComplete="off"
            value={formValues.password}
            validators={['required']}
            errorMessages={[t('user.errorRequired')]}
            disabled={auth.signInLoading}
          />
          <LoadingButton
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginBottom: '10px' }}
            type="submit"
            // endIcon={<SendIcon />}
            disabled={auth.signInLoading}
            loading={auth.signInLoading}
            loadingPosition="center"
          >
            {t('auth.signIn')}
          </LoadingButton>
          <div className="signin__bottom">
            <div className="signin__bottom-reg">{t('auth.notRegistered')}</div>
            <Link className="signin__bottom-link" to="/sign-up">
              {t('auth.signUp')}
            </Link>
          </div>
        </ValidatorForm>{' '}
      </Grid>
    </Box>
  );
};

export default SignInPage;
