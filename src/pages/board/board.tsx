import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from 'store/store';
import Column from './components/column';
import CreateColumnForm from './components/create-column-form';
import CreateTaskForm from './components/create-task-form';
import { deleteColumn, getColumnsInBoard, updateColumnById, updateSetOfColumns } from 'store/columns/columns-thunks';
import { getTasksByBoardId, deleteTask, updateTaskById, updateSetOfTasks } from 'store/tasks/tasks-thunk';
import { Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import resortColumnArr from './functions/resort-column-arr';
import { useTranslation } from 'react-i18next';
import sortTasks from './functions/sort-tasks';
import resortTasksArr from './functions/resort-tasks-arr';
import useMoveTask from './functions/use-move-task';
import CircularProgress from '@mui/material/CircularProgress';
import sortArr from './functions/sort-arr';

export interface ITaskState {
  columnId: string;
  taskId: string;
  taskOrder: string;
}

export interface IColumnState {
  columnId: string;
  columnOrder: string;
}

export enum DragItemType {
  COLUMN = 'column',
  TASK = 'task',
  NONE = '',
}

export interface IDragItemState {
  type: DragItemType;
  columnId: string;
  taskId: string;
  order: string;
}

const Board = (): JSX.Element => {
  const { t } = useTranslation();
  const columnTranslation = {
    columnNewTitle: t('board.columnNewTitle'),
    changeTitle: t('board.changeTitle'),
    columnDeleteMessage: t('board.deleteMessage', { item: 'column', itemRu: 'колонку' }),
  };
  const taskTranslation = {
    addTaskBtnTitle: t('board.addTask'),
    changeTaskBtnTitle: t('board.changeTask'),
    taskNewTitle: t('board.taskNewTitle'),
    taskNewDescription: t('board.taskNewDescription'),
    taskDeleteMessage: t('board.deleteMessage', { item: 'task', itemRu: 'задачу' }),
  };
  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect((): void => {
    async function getData() {
      const boardId = store.getState().rootReducer.boardsReducer.boardById?._id;
      if (boardId) {
        await dispatch(getColumnsInBoard(boardId));
        await dispatch(getTasksByBoardId(boardId));
      }
    }

    getData();
  }, [dispatch]);

  const userId = useSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const currentBoard = useSelector((state: RootState) => state.rootReducer.boardsReducer.boardById);
  const currentBoardColumns = useSelector((state: RootState) => state.rootReducer.columnsReducer.columns);
  const currentBoardColumnsCount = currentBoardColumns.length;
  const sortedCurrentBoardColumns = sortArr(currentBoardColumns);
  const currentBoardTasks = useSelector((state: RootState) => state.rootReducer.tasksReducer.getTasksByBoardId);
  const sortedTasks = sortTasks(currentBoardColumns, currentBoardTasks);
  const allColumnsIsGetting = useSelector((state: RootState) => state.rootReducer.columnsReducer.columnsLoading);
  const allColumnsIsUpdating = useSelector(
    (state: RootState) => state.rootReducer.columnsReducer.updateSetOfColumnsLoading
  );
  const oneColumnIsUpdating = useSelector(
    (state: RootState) => state.rootReducer.columnsReducer.updateColumnByIdLoading
  );
  const oneColumnIsDeleting = useSelector((state: RootState) => state.rootReducer.columnsReducer.deleteColumnLoading);
  const allTasksIsGetting = useSelector((state: RootState) => state.rootReducer.tasksReducer.getTasksByBoardIdLoading);
  const allTasksIsUpdating = useSelector((state: RootState) => state.rootReducer.tasksReducer.updateTasksByIdsLoading);
  const oneTaskIsDeleting = useSelector((state: RootState) => state.rootReducer.tasksReducer.deleteTasksLoading);
  const columnsIsLoading = allColumnsIsGetting || allColumnsIsUpdating || oneColumnIsDeleting;
  const columnIsLoading = oneColumnIsUpdating;
  const tasksIsLoading = allTasksIsGetting || allTasksIsUpdating || oneTaskIsDeleting;

  useEffect(() => {
    const newOrder = resortTasksArr(currentBoardColumns, currentBoardTasks);

    if (newOrder) {
      dispatch(updateSetOfTasks(newOrder));
      dispatch(getTasksByBoardId(currentBoard._id));
    }
  }, [dispatch, currentBoard._id, currentBoardColumns, currentBoardTasks]);

  const [formIsShown, setFormIsShown] = useState(false);
  const [taskIsChosen, setTaskIsChosen] = useState(false);
  const [clickedAddTaskColumnId, setClickedAddTaskColumnId] = useState('');
  const [clickedEditTitleColumnId, setClickedEditTitleColumnId] = useState('');
  const [clickedEditTaskId, setClickedEditTaskId] = useState('');
  const [currentColumnTitle, setCurrentColumnTitle] = useState('');
  const [currentTaskContent, setCurrentTaskContent] = useState({ title: '', description: '' });
  const [dragItem, setDragItem] = useState({ type: DragItemType.NONE, columnId: '', taskId: '', order: '' });
  const [dropColumn, setDropColumn] = useState({ columnId: '', columnOrder: '' });
  const [newColumnsOrder, setNewColumnsOrder] = useState(null);
  const [dropTask, setDropTask] = useState({ columnId: '', taskId: '', taskOrder: '' });

  useMoveTask(currentBoard, dragItem, dropTask, dropColumn, setDragItem, setDropColumn, setDropTask, currentBoardTasks);

  const deleteColumnByButtonPress = (columnId: string): void => {
    dispatch(deleteColumn({ boardId: currentBoard._id, columnId }));
  };

  const deleteTaskByButtonPress = async ({ boardId, columnId, taskId }: IGetTasksRequest): Promise<void> => {
    await dispatch(deleteTask({ boardId, columnId, taskId }));
    await dispatch(getTasksByBoardId(boardId));
  };

  const toggleForm = (): void => {
    if (formIsShown) {
      setFormIsShown(false);
    } else {
      setFormIsShown(true);
    }
  };

  const handleAddColumn = (): void => {
    setTaskIsChosen((): boolean => false);
    toggleForm();
  };

  const showColumnTitleInput = (columnId: string): void => {
    setClickedEditTitleColumnId((): string => {
      return columnId;
    });
  };

  const changeColumnTitleState = (inputValue: string): void => {
    setCurrentColumnTitle((): string => {
      return inputValue;
    });
  };

  const changeTaskContentState = (inputValues: { title: string; description: string }): void => {
    setCurrentTaskContent((): { title: string; description: string } => {
      return inputValues;
    });
  };

  const changeColumnTitle = async (column: IColumnResponse): Promise<void> => {
    await dispatch(
      updateColumnById({
        boardId: currentBoard._id,
        columnId: column._id,
        title: currentColumnTitle,
        order: column.order,
      })
    );
    changeColumnTitleState('');
    showColumnTitleInput('');
  };

  const changeTaskContent = async (task: ITask): Promise<void> => {
    await dispatch(
      updateTaskById({
        title: currentTaskContent.title,
        order: task.order,
        description: currentTaskContent.description,
        columnId: task.columnId,
        boardId: task.boardId,
        taskId: task._id,
        userId: 0, // Здесь ошибка в бекенде - должна быть string
        users: task.users,
      })
    );
    changeTaskContentState({ title: '', description: '' });
    setClickedEditTaskId('');
    await dispatch(getTasksByBoardId(currentBoard._id));
  };

  useEffect(() => {
    const getNewOrder = (dragItem: IDragItemState, dropColumn: IColumnState): number[] => {
      let newOrder = [];
      for (let i = 0; i < currentBoardColumnsCount; i += 1) {
        newOrder.push(i);
      }
      if (dragItem.type === DragItemType.COLUMN && dropColumn.columnOrder) {
        newOrder = newOrder.map((elem, index) => {
          if (index === +dragItem.order) {
            return +dropColumn.columnOrder;
          } else if (index === +dropColumn.columnOrder) {
            return +dragItem.order;
          }
          return index;
        });
        setDragItem({ type: DragItemType.NONE, columnId: '', taskId: '', order: '' });
        setDropColumn({ columnId: '', columnOrder: '' });
      }
      return newOrder;
    };

    if (dragItem.columnId && dropColumn.columnId && dragItem.type === DragItemType.COLUMN) {
      setNewColumnsOrder(resortColumnArr(sortedCurrentBoardColumns, getNewOrder(dragItem, dropColumn)));
    }

    if (newColumnsOrder) {
      dispatch(updateSetOfColumns(newColumnsOrder));
      setNewColumnsOrder(null);
    }
  }, [dispatch, dragItem, dropColumn, newColumnsOrder, sortedCurrentBoardColumns, currentBoardColumnsCount]);

  const renderAllColumns = (boardColumns: IColumnResponse[]): JSX.Element[] =>
    boardColumns.map((column): JSX.Element => {
      let isChosenColumnTitle = false;
      if (clickedEditTitleColumnId === column._id) {
        isChosenColumnTitle = true;
      }
      return Column({
        userId,
        board: currentBoard,
        column,
        tasks: sortedTasks,
        key: column._id,
        isChosenColumnTitle,
        currentColumnTitle,
        columnTranslation,
        taskTranslation,
        columnIsLoading,
        tasksIsLoading,
        clickedEditTaskId,
        currentTaskContent,
        deleteColumnByButtonPress,
        deleteTaskByButtonPress,
        toggleForm,
        setTaskIsChosen,
        setClickedAddTaskColumnId,
        setClickedEditTaskId,
        setDragItem,
        setDropColumn,
        setDropTask,
        showColumnTitleInput,
        changeColumnTitleState,
        changeTaskContentState,
        changeColumnTitle,
        changeTaskContent,
      });
    });

  return (
    <Grid container className="board__conteiner" sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <Grid
        item
        className="board__btn-conteiner"
        sx={{ width: { xs: '500px', md: '100px' }, flexDirection: { xs: 'row', md: 'column' } }}
        xl={0.8}
        xs={12}
        md={0.8}
      >
        <Link to="/boards">
          <Button
            className="board__back-btn"
            sx={{ fontSize: '11px', width: { xs: '100px', md: '70px' }, height: '40px' }}
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIosIcon />}
          >
            {t('board.back')}
          </Button>
        </Link>
        <Button
          className="board__create-board-btn"
          sx={{
            fontSize: '11px',
            width: { xs: '150px', md: '70px' },
            height: { xs: '40px', md: '50%' },
            flexDirection: { xs: 'row', md: 'column' },
            marginTop: { xs: '0', md: '12vh', xl: '12vh' },
          }}
          onClick={handleAddColumn}
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
        >
          {t('board.addColumn')}
        </Button>
      </Grid>
      <Grid container item className="column-conteiner" xl={11.1} md={11.05} xs={12}>
        <Grid
          container
          item
          className={formIsShown ? 'board__form' : 'board__form board__form_hidden'}
          xl={2.2}
          xs={2.2}
          component={Paper}
        >
          <Button
            className="board-form__close-btn"
            onClick={toggleForm}
            variant="outlined"
            color="error"
            startIcon={<CloseIcon />}
          ></Button>
          {taskIsChosen ? (
            <CreateTaskForm
              userId={userId}
              board={currentBoard}
              columnId={clickedAddTaskColumnId}
              sortedTasks={sortedTasks}
              toggleForm={toggleForm}
            />
          ) : (
            <CreateColumnForm
              board={currentBoard}
              currentBoardColumnsCount={currentBoardColumnsCount}
              toggleForm={toggleForm}
            />
          )}
        </Grid>
        <Typography className="board__title" variant="h4" sx={{ fontFamily: 'monospace' }}>
          {currentBoard ? currentBoard.title : t('board.unchoisen')}
        </Typography>
        <Grid container className="board__columns-layout">
          {columnsIsLoading ? (
            <Grid container className="board__loading">
              <CircularProgress color="primary" />
              <Typography className="board__loading-title" variant="h4">
                {t('loading')}
              </Typography>
            </Grid>
          ) : (
            renderAllColumns(sortedCurrentBoardColumns)
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Board;
