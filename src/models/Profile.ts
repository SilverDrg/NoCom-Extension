export interface ProfileModel {
  id: string;
  username: string;
  comments: number;
  likes: number;
}

export const defaultProfile: ProfileModel = {
  id: '',
  username: '',
  comments: 0,
  likes: 0,
};
