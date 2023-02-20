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
  isDeleted: boolean;
  isLiked: boolean;
}

export interface CommentFormModel {
  content: string;
  nsfw: boolean;
  website: string;
  userId: string | null;
  replyId?: string;
}
