import sortArr from './sort-arr';

function sortTasks(columns: IColumnResponse[], tasks: ITask[]): Map<string, ITask[]> {
  const sortedTasks = new Map();
  if (columns && tasks) {
    columns.forEach((column) => {
      const tasksArr = tasks.filter((task) => column._id === task.columnId);
      const sortedTasksOfCurrentColumn = sortArr(tasksArr);
      sortedTasks.set(column._id, sortedTasksOfCurrentColumn);
    });
  }

  return sortedTasks;
}

export default sortTasks;
