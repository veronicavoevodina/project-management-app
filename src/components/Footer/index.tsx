import Avatar from '@mui/material/Avatar';
import pictV from './../../assets/img/Veronika.jpg';
import pictA from './../../assets/img/Alexey.jpg';
import pictI from './../../assets/img/Ivan.jpg';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import theme from 'components/Theme';

const pictures = [
  { picture: pictA, link: 'https://github.com/intellectualDarknet' },
  { picture: pictI, link: 'https://github.com/Legat14' },
  { picture: pictV, link: 'https://github.com/veronicavoevodina' },
];
const Footer = () => {
  return (
    <AppBar component="footer" color="secondary" sx={{ position: 'static' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 2, display: { md: 'flex' }, justifyContent: 'start' }}>
          <a href="https://rs.school/" target="_blank" rel="noreferrer">
            <Typography textAlign="center" sx={{ color: theme.palette.primary.main, fontFamily: 'monospace' }}>
              RS SCHOOL
            </Typography>
          </a>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
          {pictures.map((pict) => (
            <a href={pict.link} target="_blank" rel="noreferrer" key={pictures.indexOf(pict)}>
              <Avatar alt="Remy Sharp" src={pict.picture} />
            </a>
          ))}
        </Box>
        <Box sx={{ flexGrow: 2, display: { md: 'flex' }, justifyContent: 'end' }}>
          <Typography textAlign="center" sx={{ color: theme.palette.primary.main, fontFamily: 'monospace' }}>
            2022
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
