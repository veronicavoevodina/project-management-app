import sortTasks from './sort-tasks';
import sortArr from './sort-arr';

function resortTasksArr(columns: IColumnResponse[], tasks: ITask[]): IUpdateSetTasksRequest[] | null {
  const sortedTasks = sortTasks(columns, tasks);
  const newOrder: IUpdateSetTasksRequest[] = [];
  let orderHasChanged = false;
  columns.forEach((column) => {
    const tasksOfCurrentColumn = sortedTasks.get(column._id);
    const sortedTasksOfCurrentColumn = sortArr(tasksOfCurrentColumn);
    sortedTasksOfCurrentColumn.forEach((task, index) => {
      if (task.order !== index) {
        orderHasChanged = true;
      }
      newOrder.push({
        _id: task._id,
        order: index,
        columnId: column._id,
      });
    });
  });
  if (newOrder && orderHasChanged) {
    return newOrder;
  }
  return null;
}

export default resortTasksArr;
