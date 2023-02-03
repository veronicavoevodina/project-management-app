declare interface IUpdateTaskRequest {
  title: string;
  order: number;
  description: string;
  columnId: string;
  boardId: string;
  taskId: string;
  userId: number;
  users: string[];
}
