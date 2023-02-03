import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from 'react-router-dom';
import { useAppSelector, RootState, useAppDispatch } from 'store/store';
import { logout } from 'store/auth/auth-slice';
import { useTranslation, Trans } from 'react-i18next';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import theme from 'components/Theme';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';

const lngs = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russia' },
};

function Header() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });
  const { t, i18n } = useTranslation();
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer?.userId);
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: trigger ? theme.palette.primary.light : 'primary',
        boxShadow: trigger ? 'none' : 'default',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <AssessmentIcon sx={{ display: 'flex', mr: 1, color: theme.palette.secondary.main }} />
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            PROJECT MANAGMENT APP
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.03rem',
              textDecoration: 'none',
            }}
          >
            {userId ? (
              <Box
                sx={{
                  width: '220px',
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Link to="/boards">
                  <Typography
                    textAlign="center"
                    sx={[
                      {
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        width: '100px',
                        fontSize: '15px',
                        color: theme.palette.secondary.main,
                        textDecoration: 'none',
                        transition: '.5s',
                      },
                      (theme) => ({
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }),
                    ]}
                  >
                    <Trans i18nKey="header.toMain"></Trans>
                  </Typography>
                </Link>
                <Link to="/user-page">
                  <Typography
                    textAlign="center"
                    sx={[
                      {
                        width: '110px',
                        fontFamily: 'monospace',
                        fontSize: '15px',
                        fontWeight: 700,
                        color: theme.palette.secondary.main,
                        textDecoration: 'none',
                        transition: '.5s',
                      },
                      ,
                      (theme) => ({
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }),
                    ]}
                  >
                    <Trans i18nKey="header.edit"></Trans>
                  </Typography>
                </Link>
              </Box>
            ) : (
              <></>
            )}
          </Box>

          {userId ? (
            <Box
              sx={{
                flexGrow: 0,
                display: { xs: 'none', sm: 'flex' },
                width: '30px',
                justifyContent: 'center',
                margin: '5px',
                alignItems: 'center',
              }}
            >
              <Tooltip title={t('main.logOut')}>
                <LogoutIcon
                  sx={[
                    (theme) => ({
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }),
                  ]}
                  onClick={() => dispatch(logout())}
                />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 0,
                display: 'flex',
                width: '80px',
                justifyContent: 'space-between',
                margin: '5px',
                alignItems: 'center',
              }}
            >
              <Tooltip title={t('main.signIn')}>
                <Link to="sign-in">
                  <PersonIcon fontSize="large" color="secondary" />
                </Link>
              </Tooltip>
              <Tooltip title={t('main.signUp')}>
                <Link to="sign-up">
                  <PersonAddAlt1Icon fontSize="large" color="secondary" />
                </Link>
              </Tooltip>
            </Box>
          )}
          {userId ? (
            <Box sx={{ flexGrow: 0, display: { xs: 'flex', sm: 'none' } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <PersonIcon fontSize="large" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Typography
                    sx={{
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: theme.palette.secondary.main,
                      padding: 0,
                    }}
                    onClick={() => dispatch(logout())}
                  >
                    {t('main.LOGOUT')}
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Link to="/boards">
                    <Typography
                      sx={{
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: theme.palette.secondary.main,
                      }}
                    >
                      <Trans i18nKey="header.toMain"></Trans>
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/user-page">
                    <Typography
                      sx={{
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: theme.palette.secondary.main,
                      }}
                    >
                      <Trans i18nKey="header.edit"></Trans>
                    </Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <></>
          )}

          <ToggleButtonGroup
            color="secondary"
            size="small"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{
              marginLeft: '15px',
            }}
          >
            {Object.keys(lngs).map((lng) => (
              <ToggleButton
                sx={[
                  (theme) => ({
                    '&:disabled': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }),
                ]}
                value={lng}
                type="submit"
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                disabled={i18n.resolvedLanguage === lng}
              >
                {lngs[lng as keyof typeof lngs].nativeName}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
