export interface ProfileModel {
  id: string;
  username: string;
  avatar: string;
  comments: number;
  likes: number;
}

export const defaultProfile: ProfileModel = {
  id: '',
  username: '',
  avatar: '',
  comments: 0,
  likes: 0,
};
