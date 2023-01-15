export interface CommentModel {
  id: number;
  content: string;
  encryptedUrl: string;
  likes: number;
  nsfw: boolean;
  replyTo: number | null;
  createdAt: string;
  updatedAt: string;
  username: string;
  isOwner: boolean;
  repliesCount: number;
  replies: object[];
}
