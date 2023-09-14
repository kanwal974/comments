export interface IComment {
  id: string;
  username: string;
  userId: string;
  comment: string;
  profileImg: string;
  parentId: string | null;
  createdAt: string;
  likes: string;
}
