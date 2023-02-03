import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector, RootState } from 'store/store';
import { useNavigate } from 'react-router-dom';
import { updateBoardById, deleteBoardById, getBoardById, getBoardsByUserId } from 'store/boards/boards-thunks';
import DeleteModal from 'components/deleteModal';
import DeleteButton from '../DeleteButton';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';
import background from 'assets/img/bg-title.png';
import theme from 'components/Theme';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  padding: theme.spacing(1),
  margin: theme.spacing(1.2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Board = (props: { title: string; id: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>(' ');
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen((open) => !open);
    setInput('');
  };
  const handleRename = () => {
    dispatch(updateBoardById({ boardId: props.id, title: input, owner: userId, users: ['string'] }));
    setOpen(false);
    dispatch(getBoardsByUserId(userId));
  };
  function findIndex() {
    const arr = props.id.split('').reverse();
    let answ = arr[0];
    if (!Number(arr[0])) {
      while (!Number(arr[0])) {
        arr.shift();
      }
      answ = 1 + arr[0];
    }
    return answ;
  }
  const path = process.env.PUBLIC_URL + `/bg/${findIndex()}.jpg`;
  const deleteCard = () => {
    dispatch(deleteBoardById(props.id));
    dispatch(getBoardsByUserId(userId));
  };

  const boardIsUpdating = useAppSelector((state: RootState) => state.rootReducer.boardsReducer.updateBoardLoading);

  return (
    <Item
      id="board-item"
      sx={{
        backgroundImage: `url(${path})`,
        height: '150px',
        width: { sm: '300px', xs: '270px' },
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onClick={async () => {
        await dispatch(getBoardById(props.id));
        navigate('/board', { replace: true });
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          padding: '0 10px',
          color: theme.palette.secondary.main,
          width: 'fit-content',
          alignSelf: 'center',
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {boardIsUpdating ? <CircularProgress color="primary" /> : props.title}
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          sx={{ margin: '10px', padding: '10px', borderRadius: '32px', width: 'auto' }}
          variant="contained"
          fullWidth
          onClick={handleClose}
        >
          {t('boards.edit')}
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{t('boards.rename')}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t('boards.enterName')}</DialogContentText>
            <TextField
              autoFocus
              id="name"
              type="text"
              fullWidth
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: 'black' }} onClick={handleRename}>
              {t('boards.rename')}
            </Button>
            <Button sx={{ color: 'black' }} onClick={handleClose}>
              {t('boards.cancel')}
            </Button>
          </DialogActions>
        </Dialog>
        <DeleteModal message={t('deleteModal.message')} submit={deleteCard} deleteButton={DeleteButton} />
      </Box>
    </Item>
  );
};

export default Board;
