declare interface IUpdateBoardByIdRequest {
  boardId: string;
  title: string;
  owner: string;
  users: string[];
}
