import React from 'react';
import { CommentModel } from '../models/Comment';
import { TokenContext } from '../components/session/TokenContextProvider';
import { apiDeleteComment } from '../util/apiCalls';
import { AxiosResponse } from 'axios';

type useCommentsListProps = {
  commentId: string;
  sortBy?: 'new' | 'old' | 'top';
  nsfw?: boolean;
  apiFetch: (
    commentId: string,
    token: string | null,
    page: number,
    sortBy: string,
    nsfw: boolean,
  ) => Promise<AxiosResponse<any, any>>;
};

export const useRepliesList = (
  props: useCommentsListProps,
): [CommentModel[], () => void, (commentId: number) => void] => {
  const { commentId, sortBy, nsfw, apiFetch } = props;
  const { token } = React.useContext(TokenContext);
  const [page, setPage] = React.useState(1);
  const [repliesList, setRepliesList] = React.useState<CommentModel[]>([]);

  React.useEffect(() => {
    let showNsfw = nsfw;
    if (!showNsfw) showNsfw = false;
    let sorting = sortBy;
    if (!sorting) sorting = 'new';
    apiFetch(commentId, token, 1, sorting, showNsfw).then(response => {
      setRepliesList(response.data);
    });
  }, [apiFetch, commentId, nsfw, sortBy, token]);

  React.useDebugValue(repliesList ?? 'Loading...');

  const loadMoreComments = React.useCallback(() => {
    let showNsfw = nsfw;
    if (!showNsfw) showNsfw = false;
    let sorting = sortBy;
    if (!sorting) sorting = 'new';
    apiFetch(commentId, token, page + 1, sorting, showNsfw).then(response => {
      const newComments: CommentModel[] = response.data;
      setRepliesList([...repliesList, ...newComments]);
      setPage(page => page + 1);
    });
  }, [nsfw, sortBy, apiFetch, commentId, token, page, repliesList]);

  const removeComment = React.useCallback(
    (commentId: number) => {
      apiDeleteComment(token, commentId).then(() => {
        const newCommentsList = repliesList.filter(comment => comment.id !== commentId);
        console.log(newCommentsList);
        setRepliesList(newCommentsList);
      });
    },
    [repliesList, token],
  );

  return [repliesList, loadMoreComments, removeComment];
};
