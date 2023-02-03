declare interface ICreateTaskRequest {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
  description: string;
  userId: number;
  users: string[];
}
