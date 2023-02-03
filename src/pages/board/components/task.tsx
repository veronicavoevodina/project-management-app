import React, { Dispatch, DragEvent, FormEvent, SetStateAction } from 'react';
import { Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import DeleteModal from 'components/deleteModal';
import DeleteTaskButton from './DeleteTaskButton';
import { DragItemType, IDragItemState, ITaskState } from '../board';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import CloseIcon from '@mui/icons-material/Close';

function Task(props: {
  board: IBoardResponse;
  column: IColumnResponse;
  task: ITask;
  key: string;
  taskTranslation: {
    taskNewTitle: string;
    taskNewDescription: string;
    changeTaskBtnTitle: string;
    addTaskBtnTitle: string;
    taskDeleteMessage: string;
  };
  isChosenTask: boolean;
  currentTaskContent: { title: string; description: string };
  setDragItem: Dispatch<SetStateAction<IDragItemState>>;
  setDropTask: Dispatch<SetStateAction<ITaskState>>;
  setClickedEditTaskId: Dispatch<SetStateAction<string>>;
  deleteTaskByButtonPress: (data: IGetTasksRequest) => void;
  changeTaskContentState: (inputValues: { title: string; description: string }) => void;
  changeTaskContent: (task: ITask) => void;
}): JSX.Element {
  const deleteThisTask = () => {
    props.deleteTaskByButtonPress({ boardId: props.board._id, columnId: props.column._id, taskId: props.task._id });
  };

  const dragStartHandler = (event: DragEvent<HTMLElement>) => {
    event.stopPropagation();
    const dragTask = event.target as HTMLElement;
    dragTask.classList.add('column__task_dragged');
  };

  const dragEndHandler = (event: DragEvent<HTMLElement>) => {
    const dragTask = event.target as HTMLElement;
    props.setDragItem({
      type: DragItemType.TASK,
      columnId: dragTask.dataset.columnId,
      taskId: dragTask.dataset.taskId,
      order: dragTask.dataset.taskOrder,
    });
    (event.target as HTMLElement).classList.remove('column__task_dragged');
  };

  const dragOverHandler = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const dropPath = event.nativeEvent.composedPath() as HTMLElement[];
    const dropTask = dropPath.find((task) => task.dataset.taskOrder);
    if (!dropTask.classList.contains('column__task_dragged')) {
      dropTask.classList.add('column__task_hovered');
    }
  };

  const dragLeaveHandler = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const dropPath = event.nativeEvent.composedPath() as HTMLElement[];
    const dropTask = dropPath.find((task) => task.dataset.taskOrder);
    if (!dropTask.classList.contains('column__task_dragged')) {
      dropTask.classList.remove('column__task_hovered');
    }
  };

  const dropHandler = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const dropPath = event.nativeEvent.composedPath() as HTMLElement[];
    const dropTask = dropPath.find((task) => task.dataset.taskOrder);
    if (dropTask) {
      props.setDropTask({
        columnId: dropTask.dataset.columnId,
        taskId: dropTask.dataset.taskId,
        taskOrder: dropTask.dataset.taskOrder,
      });
      dropTask.classList.remove('column__task_hovered');
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const clickPath = event.nativeEvent.composedPath() as HTMLElement[];
    const task = clickPath.find((elem): boolean => !!elem.dataset.taskId);
    if (task) {
      props.changeTaskContentState({ title: props.task.title, description: props.task.description });
      props.setClickedEditTaskId(task.dataset.taskId);
    }
  };

  const handleCloseTaskInput = (): void => {
    props.changeTaskContentState({ title: '', description: '' });
    props.setClickedEditTaskId('');
  };

  const handleTaskTitleInputChange = (event: FormEvent<HTMLFormElement>) => {
    const newValue = { ...props.currentTaskContent, title: (event.target as HTMLInputElement).value };
    props.changeTaskContentState(newValue);
  };

  const handleTaskDescriptionInputChange = (event: FormEvent<HTMLFormElement>) => {
    const newValue = { ...props.currentTaskContent, description: (event.target as HTMLInputElement).value };
    props.changeTaskContentState(newValue);
  };

  const handleTaskContentInputSubmit = (event: FormEvent<Element>): void => {
    event.stopPropagation();
    props.changeTaskContent(props.task);
  };

  return (
    <Paper
      className="column__task"
      key={props.key}
      elevation={2}
      draggable={true}
      data-column-id={props.column._id}
      data-task-id={props.task._id}
      data-task-order={props.task.order}
      onDragStart={(event: DragEvent<HTMLElement>) => {
        dragStartHandler(event);
      }}
      onDragEnd={(event: DragEvent<HTMLElement>) => {
        dragEndHandler(event);
      }}
      onDragOver={(event: DragEvent<HTMLElement>) => {
        dragOverHandler(event);
      }}
      onDragLeave={(event: DragEvent<HTMLElement>) => {
        dragLeaveHandler(event);
      }}
      onDrop={(event: DragEvent<HTMLElement>) => {
        dropHandler(event);
      }}
    >
      {props.isChosenTask ? (
        <Grid container item className="column__title-form-conteiner">
          <ValidatorForm className="column__title-form" onSubmit={handleTaskContentInputSubmit} noValidate>
            <TextValidator
              className="task__title-input"
              onChange={handleTaskTitleInputChange}
              // onBlur={handleColumnTitleInputClose}
              autoComplete="off"
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
              id="task-title"
              label={props.taskTranslation.taskNewTitle}
              name="task-title"
              autoFocus
              value={props.currentTaskContent.title}
              validators={['required']}
              errorMessages={['this field is required', 'task title is not valid']}
            />
            <TextValidator
              className="task__description-input"
              onChange={handleTaskDescriptionInputChange}
              // onBlur={handleColumnTitleInputClose}
              autoComplete="off"
              variant="outlined"
              size="small"
              margin="normal"
              required
              fullWidth
              id="task-description"
              label={props.taskTranslation.taskNewDescription}
              name="task-description"
              autoFocus
              value={props.currentTaskContent.description}
              validators={['required']}
              errorMessages={['this field is required', 'task description is not valid']}
            />
            <ButtonGroup className="title-form__btn-group">
              <Button variant="contained" color="primary" type="submit">
                {props.taskTranslation.changeTaskBtnTitle}
              </Button>
              <Button
                className="task__close-input-btn"
                onClick={handleCloseTaskInput}
                variant="contained"
                color="error"
              >
                <CloseIcon />
              </Button>
            </ButtonGroup>
          </ValidatorForm>{' '}
        </Grid>
      ) : (
        <>
          <Grid container item className="task__description-conteiner" onClick={handleClick} xl={10} xs={10}>
            <Typography className="task__description" variant="h6">
              {props.task.title}
            </Typography>
            <Typography className="task__description" variant="body1">
              {props.task.description}
            </Typography>
          </Grid>
          <Grid className="task__btn-conteiner" item xl={1.8} xs={1.8}>
            <DeleteModal
              message={props.taskTranslation.taskDeleteMessage}
              submit={deleteThisTask}
              deleteButton={DeleteTaskButton}
            />
          </Grid>
        </>
      )}
    </Paper>
  );
}

export default Task;
