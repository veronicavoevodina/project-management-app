import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import './start.scss';
import { Link } from 'react-router-dom';
import { RootState, useAppSelector } from 'store/store';
import { useTranslation, Trans } from 'react-i18next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Paper, styled } from '@mui/material';
import pictV from './../../assets/img/Veronika.jpg';
import pictA from './../../assets/img/Alexey.jpg';
import pictI from './../../assets/img/Ivan.jpg';
import pictT from './../../assets/img/Taras.jpg';
import theme from 'components/Theme';

const team = [
  { picture: pictI, name: 'ivan', link: 'https://github.com/Legat14' },
  { picture: pictV, name: 'veronika', link: 'https://github.com/veronicavoevodina' },
  { picture: pictA, name: 'alexey', link: 'https://github.com/intellectualDarknet' },
  { picture: pictT, name: 'taras', link: 'https://github.com/tarasdemidovich1995' },
];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.secondary.main,
  lineHeight: '60px',
  opacity: '0.9',
  padding: '15px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Start = () => {
  const { t } = useTranslation();
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const proceedLink = (link: string): void => {
    window.location.href = link;
  };
  return (
    <>
      <Grid
        className="start-page"
        container
        spacing={5}
        columns={15}
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-start', xs: 'center' },
          alignItems: 'center',
          width: { xs: '100%', md: '90%' },
          margin: 0,
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: { sm: '530px', xs: '300px' },
            height: { sm: '300px', xs: '400px' },
            marginLeft: { sm: '10%', xs: 0 },
          }}
        >
          <Item elevation={24}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'monospace' }}>
              {t('main.heading')}
            </Typography>
            <Typography
              variant="h6"
              textAlign="left"
              gutterBottom
              sx={{ fontFamily: 'monospace', p: { sm: '10px', xs: '5px' } }}
            >
              {t('main.text')}
            </Typography>

            {!userId ? (
              <Box sx={{ width: { sm: '80%', xs: '100%' }, display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/Sign-in">
                  <Button
                    variant="contained"
                    sx={[
                      {
                        margin: '5px',
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.primary.main,
                        borderRadius: '32px',
                        fontSize: { xs: '0.7rem', sm: 'inherit' },
                      },
                      (theme) => ({
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.dark,
                        },
                      }),
                    ]}
                    endIcon={<PersonIcon sx={{ display: { sm: 'flex', xs: 'none' } }} />}
                  >
                    {t('main.signIn')}
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button
                    variant="contained"
                    sx={[
                      {
                        margin: '5px',
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.primary.main,
                        borderRadius: '32px',
                        fontSize: { xs: '0.7rem', sm: 'inherit' },
                      },
                      (theme) => ({
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.dark,
                        },
                      }),
                    ]}
                    endIcon={<PersonAddIcon sx={{ display: { sm: 'flex', xs: 'none' } }} />}
                  >
                    {t('main.signUp')}
                  </Button>
                </Link>{' '}
              </Box>
            ) : (
              <Box sx={{ width: '80%', display: 'flex', justifyContent: 'center' }}>
                <Link to="/boards">
                  <Button
                    variant="contained"
                    sx={[
                      {
                        margin: '5px',
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.primary.main,
                        borderRadius: '32px',
                      },
                      (theme) => ({
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.dark,
                        },
                      }),
                    ]}
                  >
                    {t('header.toMain')}
                  </Button>
                </Link>
              </Box>
            )}
          </Item>
        </Box>
      </Grid>
      <Grid
        className="medium-block"
        container
        spacing={5}
        columns={15}
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-end', xs: 'center' },
          width: '100%',
          margin: 0,
          minHeight: '90vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: { sm: 'flex-end', xs: 'center' },
            alignItems: 'center',
            width: { sm: '500px', xs: '300px' },
            height: { sm: '300px' },
            marginTop: '5%',
            marginRight: { sm: '10%', xs: 0 },
            padding: 0,
          }}
        >
          <Item elevation={24}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontFamily: 'monospace', p: { sm: '10px', xs: '0' }, textAlign: { xs: 'center', sm: 'justify' } }}
            >
              {t('main.medium')}
            </Typography>
          </Item>
        </Box>
      </Grid>
      <Grid
        className="rsschool-block"
        container
        spacing={5}
        columns={15}
        sx={{
          display: 'flex',
          justifyContent: { sm: 'flex-start', xs: 'center' },
          width: '100%',
          margin: 0,
          minHeight: '90vh',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: { sm: '500px', xs: '300px' },
            height: { sm: '300px' },
            marginTop: '5%',
            padding: 0,
            justifyContent: 'center',
            marginLeft: { sm: '10%', xs: 0 },
          }}
        >
          <Item elevation={24}>
            <Typography
              variant="h6"
              textAlign="justify"
              gutterBottom
              sx={{ fontFamily: 'monospace', p: { sm: '10px', xs: '0' } }}
            >
              <Trans
                i18nKey="main.rsschool"
                components={[
                  <a key="1" target="_blank" rel="noreferrer noopener" href="https://rs.school/react/">
                    React
                  </a>,
                ]}
              />
            </Typography>
          </Item>
        </Box>
      </Grid>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          minHeight: '90vh',
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'monospace' }}>
          {t('main.team')}
        </Typography>
        <Box sx={{ width: '93%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {team.map((el) => (
            <Card
              onClick={() => proceedLink(el.link)}
              sx={{
                maxWidth: '300px',
                height: 'auto',
                paddingBottom: '10px',
                margin: '10px',
                display: 'flex',
                borderRadius: '20px',
              }}
              key={el.name}
            >
              <CardActionArea>
                <CardMedia component="img" height="170" image={el.picture} alt="green iguana" />
                <CardContent sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {t(`main.${el.name}`)}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t(`main.descr${el.name}`)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(`main.text${el.name}`)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Start;
