export interface Comment {
  id: string;
  content: string;
  userNamePostedBy: string;
  datePostedOn: Date;
  likes: number;
}
