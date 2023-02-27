import Axios, { AxiosResponse } from 'axios';
import { API_URL, headers } from '../components/constants';
import { CommentFormModel } from '../models/Comment';

export const apiFetchComments = (
  token: string | null,
  page: number,
  sortBy: string,
  nsfw: boolean,
  website: string | undefined,
): Promise<AxiosResponse<any, any>> => {
  return Axios.get(`${API_URL}/Comments/all/${website}/${sortBy}/${page}/${nsfw}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiFetchUserComments = (
  token: string | null,
  page: number,
  sortBy: string,
  nsfw: boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  website: string | undefined,
): Promise<AxiosResponse<any, any>> => {
  return Axios.get(`${API_URL}/Comments/user/${sortBy}/${page}/${nsfw}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiFetchUserLikes = (
  token: string | null,
  page: number,
  sortBy: string,
  nsfw: boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  website: string | undefined,
): Promise<AxiosResponse<any, any>> => {
  return Axios.get(`${API_URL}/LikedComments/user/${sortBy}/${page}/${nsfw}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiFetchReplies = (
  commentId: string,
  token: string | null,
  page: number,
  sortBy: string,
  nsfw: boolean,
) => {
  return Axios.get(`${API_URL}/Comments/${commentId}/${sortBy}/${page}/${nsfw}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiFetchComment = (token: string | null, commentId: string) => {
  return Axios.get(`${API_URL}/Comments/${commentId}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiPostComment = (token: string | null, comment: CommentFormModel) => {
  return Axios.post(
    API_URL + '/Comments',
    {
      content: comment.content,
      nsfw: comment.nsfw,
      website: comment.website ?? '',
      userId: comment.userId,
      replyId: comment.replyId,
    },
    { headers: { Authorization: `Bearer ${token}`, token: `${token}` } },
  );
};

export const apiSetLike = (token: string | null, commentId: number, liked: boolean) => {
  return Axios.post(
    `${API_URL}/LikedComments/${commentId}`,
    {
      commentId,
      liked,
    },
    {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const apiDeleteComment = (token: string | null, commentId: number) => {
  return Axios.delete(`${API_URL}/Comments/${commentId}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiGetProfile = (userId: string): Promise<AxiosResponse<any, any>> => {
  return Axios.get(`${API_URL}/Profile/id/${userId}`, {
    headers: {
      ...headers,
    },
  });
};

export const apiGetProfileUsername = (username: string): Promise<AxiosResponse<any, any>> => {
  return Axios.get(`${API_URL}/Profile/username/${username}`, {
    headers: {
      ...headers,
    },
  });
};

export const apiGetBanner = (userId: string): Promise<AxiosResponse<any, any>> => {
  return Axios.get(`${API_URL}/Profile/banner/id/${userId}`, {
    headers: {
      ...headers,
    },
  });
};

export const apiGetBannerUsername = (username: string): Promise<AxiosResponse<any, any>> => {
  return Axios.get(`${API_URL}/Profile/banner/username/${username}`, {
    headers: {
      ...headers,
    },
  });
};

export const apiPostAvatar = (token: string | null, data: FormData) => {
  return Axios.post(`${API_URL}/Profile/avatar/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiPostBanner = (token: string | null, data: FormData) => {
  return Axios.post(`${API_URL}/Profile/banner/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiUsernameExists = (searchTerm: string): Promise<AxiosResponse<any, any>> => {
  return Axios.get(API_URL + '/Account/Username/' + searchTerm);
};

type SignUp = {
  Username: string | null;
  Email: string | null;
  Password: string | null;
  ConfirmPassword: string | null;
};

export const apiSignUp = (newUser: SignUp): Promise<AxiosResponse<any, any>> => {
  return Axios.post(API_URL + '/Account/Register', {
    Username: newUser.Username,
    Email: newUser.Email,
    Password: newUser.Password,
    ConfirmPassword: newUser.ConfirmPassword,
  });
};

type SignIn = {
  Username: string | null;
  Password: string | null;
};

export const apiSignIn = (user: SignIn): Promise<AxiosResponse<any, any>> => {
  return Axios.post(API_URL + '/Account/Login', {
    Username: user.Username,
    Password: user.Password,
  });
};
