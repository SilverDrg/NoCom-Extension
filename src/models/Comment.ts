export interface CommentModel {
    id: number;
    content: string;
    encryptedUrl: string;
    likes: number;
    nsfw: boolean;
    replyTo: number;
    createdAt: number;
    updatedAt: number;
    username: string;
}
