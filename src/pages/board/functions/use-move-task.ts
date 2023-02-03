import { Dispatch, SetStateAction } from 'react';
import { DragItemType, IColumnState, IDragItemState, ITaskState } from '../board';
import useChangeTaskOrder from './use-change-task-order';

async function useMoveTask(
  board: IBoardResponse,
  dragItem: IDragItemState,
  dropTaskState: ITaskState,
  dropColumn: IColumnState,
  setDragItem: Dispatch<SetStateAction<IDragItemState>>,
  setDropColumn: Dispatch<SetStateAction<IColumnState>>,
  setDropTask: Dispatch<SetStateAction<ITaskState>>,
  currentBoardTasks: ITask[]
): Promise<void> {
  let dragTask: ITask;
  let dropTask: ITask;
  if (dragItem.type === DragItemType.TASK && dropTaskState.taskId && currentBoardTasks) {
    dragTask = currentBoardTasks.find((task) => task._id === dragItem.taskId);
    dropTask = currentBoardTasks.find((task) => task._id === dropTaskState.taskId);
  } else if (dragItem.type === DragItemType.TASK && currentBoardTasks) {
    dragTask = currentBoardTasks.find((task) => task._id === dragItem.taskId);
  }
  await useChangeTaskOrder(board, dragTask, dropTask, dropColumn, setDragItem, setDropColumn, setDropTask);
}

export default useMoveTask;
