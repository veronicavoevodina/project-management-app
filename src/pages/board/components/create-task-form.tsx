import { FormEvent, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { createTask, getTasksByBoardId } from 'store/tasks/tasks-thunk';
import { useTranslation } from 'react-i18next';

interface ITaskState {
  title: string;
  description: string;
}

const CreateTaskForm = (props: {
  userId: string;
  board: IGetBoardResponse;
  columnId: string;
  sortedTasks: Map<string, ITask[]>;
  toggleForm: () => void;
}): JSX.Element => {
  const taskIsCreating = useAppSelector((state: RootState) => state.rootReducer.tasksReducer.createTaskLoading);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [taskState, setTaskState] = useState<ITaskState>({ title: '', description: '' });
  const onColumnTitleSubmit = async () => {
    await dispatch(
      createTask({
        boardId: props.board._id,
        columnId: props.columnId,
        title: taskState.title,
        order: props.sortedTasks.get(props.columnId).length,
        description: taskState.description,
        userId: 0, // Здесь ошибка типа на бэкенде
        users: [props.userId],
      })
    );
    await dispatch(getTasksByBoardId(props.board._id));
    setTaskState(() => {
      return { title: '', description: '' };
    });
    props.toggleForm();
  };

  function onFormChange(e: FormEvent<HTMLFormElement>) {
    const field = (e.target as HTMLInputElement).id;
    const value = (e.target as HTMLInputElement).value;
    setTaskState((formValues) => {
      return {
        ...formValues,
        [field]: value,
      };
    });
  }

  return (
    <Grid
      item
      className="board__create_task_form"
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
        <Typography variant="h5" component="h2" sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem' }, textAlign: 'center' }}>
          {t('board.newTask')}
        </Typography>
        <TextValidator
          autoComplete="off"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label={t('board.createNewTaskTitlePlaceholder')}
          name="task-title"
          autoFocus
          value={taskState.title}
          validators={['required']}
          errorMessages={['this field is required', 'task title is not valid']}
        />
        <TextValidator
          autoComplete="off"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label={t('board.createNewTaskDescriptionPlaceholder')}
          name="task-Description"
          value={taskState.description}
          validators={['required']}
          errorMessages={['this field is required', 'task description is not valid']}
        />

        <LoadingButton
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ marginBottom: '10px' }}
          type="submit"
          disabled={taskIsCreating}
          loading={taskIsCreating}
          loadingPosition="center"
        >
          {t('board.createTask')}
        </LoadingButton>
      </ValidatorForm>{' '}
    </Grid>
  );
};

export default CreateTaskForm;
