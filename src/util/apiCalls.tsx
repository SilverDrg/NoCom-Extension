import Axios, { AxiosResponse } from 'axios';
import { API_URL, headers } from '../components/constants';

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
