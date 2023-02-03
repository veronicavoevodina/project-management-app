import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { createColumn } from 'store/columns/columns-thunks';
import { useTranslation } from 'react-i18next';

interface IColumnTitle {
  title: string;
}

const CreateColumnForm = (props: {
  board: IGetBoardResponse;
  currentBoardColumnsCount: number;
  toggleForm: () => void;
}): JSX.Element => {
  const columnIsCreating = useAppSelector((state: RootState) => state.rootReducer.columnsReducer.createColumnLoading);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [newColumnTitle, setNewColumnTitle] = useState<IColumnTitle>({ title: '' });
  const onColumnTitleSubmit = async () => {
    await dispatch(
      createColumn({
        boardId: props.board._id,
        title: newColumnTitle.title,
        order: props.currentBoardColumnsCount,
      })
    );
    setNewColumnTitle(() => {
      return { title: '' };
    });
    props.toggleForm();
  };

  function onFormChange(e: FormEvent<HTMLFormElement>) {
    const value = (e.target as HTMLInputElement).value;
    setNewColumnTitle(() => {
      return { title: value };
    });
  }

  return (
    <Grid
      item
      className="board__create_column_form"
      sx={{
        width: '100%',
        height: '60%',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0 20px 20px 0',
      }}
    >
      <ValidatorForm onSubmit={onColumnTitleSubmit} onChange={onFormChange} noValidate sx={{ width: '80%' }}>
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
          {t('board.newColumnTitle')}
        </Typography>
        <TextValidator
          autoComplete="off"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="new-column-title"
          label={t('board.createNewColumnPlaceholder')}
          name="new-column-title"
          autoFocus
          value={newColumnTitle.title}
          validators={['required']}
          errorMessages={['this field is required', 'column title is not valid']}
        />

        <LoadingButton
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ marginBottom: '10px' }}
          type="submit"
          disabled={columnIsCreating}
          loading={columnIsCreating}
          loadingPosition="center"
        >
          {t('board.createColumn')}
        </LoadingButton>
      </ValidatorForm>
    </Grid>
  );
};

export default CreateColumnForm;
