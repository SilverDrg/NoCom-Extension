import React from 'react';
import { useWebsiteUrl } from './useWebsiteUrl';
import { CommentModel } from '../models/Comment';
import { TokenContext } from '../components/session/TokenContextProvider';
import { apiDeleteComment } from '../util/apiCalls';
import { AxiosResponse } from 'axios';

type useCommentsListProps = {
  sortBy?: 'new' | 'old' | 'top';
  apiFetch: (
    token: string | null,
    page: number,
    sortBy: string,
    website: string | undefined,
  ) => Promise<AxiosResponse<any, any>>;
};

export const useCommentsList = (
  props: useCommentsListProps,
): [CommentModel[], () => void, (commentId: number) => void] => {
  const { sortBy, apiFetch } = props;
  const { token } = React.useContext(TokenContext);
  const [page, setPage] = React.useState(1);
  const website = useWebsiteUrl();
  const [commentsList, setCommentsList] = React.useState<CommentModel[]>([]);

  React.useEffect(() => {
    let sorting = sortBy;
    if (!sorting) sorting = 'new';
    apiFetch(token, 1, sorting, website).then(response => {
      setCommentsList(response.data);
    });
  }, [apiFetch, sortBy, token, website]);

  React.useDebugValue(commentsList ?? 'Loading...');

  const loadMoreComments = React.useCallback(() => {
    let sorting = sortBy;
    if (!sorting) sorting = 'new';
    apiFetch(token, page + 1, sorting, website).then(response => {
      const newComments: CommentModel[] = response.data;
      setCommentsList([...commentsList, ...newComments]);
      setPage(page => page + 1);
    });
  }, [apiFetch, commentsList, page, sortBy, token, website]);

  //TODO: Create modal to make sure the user wants to remove the comment
  const removeComment = React.useCallback(
    (commentId: number) => {
      apiDeleteComment(token, commentId).then(() => {
        const newCommentsList = commentsList.filter(comment => comment.id !== commentId);
        console.log(newCommentsList);
        setCommentsList(newCommentsList);
      });
    },
    [commentsList, token],
  );

  return [commentsList, loadMoreComments, removeComment];
};
