import Axios, { AxiosResponse } from 'axios';
import { API_URL, headers } from '../components/constants';
import { CommentFormModel } from '../models/Comment';

export const apiFetchComments = (
  token: string | null,
  website: string | undefined,
  page: number,
): Promise<AxiosResponse<any, any>> => {
  return Axios.get(`${API_URL}/Comments/all/${website}/${page}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiFetchUserCommentsNew = (token: string | null, page: number): Promise<AxiosResponse<any, any>> => {
  return Axios.get(`${API_URL}/Comments/user/new/${page}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiFetchUserCommentsTop = (token: string | null, page: number): Promise<AxiosResponse<any, any>> => {
  return Axios.get(`${API_URL}/Comments/user/top/${page}`, {
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
