import React from 'react';
import { useWebsiteUrl } from './useWebsiteUrl';
import { CommentModel } from '../models/Comment';
import { TokenContext } from '../components/session/TokenContextProvider';
import { apiFetchComments } from '../util/apiCalls';

export const useCommentsList = (): [CommentModel[], () => void] => {
  const { token } = React.useContext(TokenContext);
  const [page, setPage] = React.useState(1);
  const website = useWebsiteUrl();
  const [commentsList, setCommentsList] = React.useState<CommentModel[]>([]);

  React.useEffect(() => {
    apiFetchComments(token, website, 1).then(response => {
      console.log(response);
      setCommentsList(response.data);
    });
  }, [token, website]);

  React.useDebugValue(commentsList ?? 'Loading...');

  const loadMoreComments = React.useCallback(() => {
    apiFetchComments(token, website, page + 1).then(response => {
      const newComments: CommentModel[] = response.data;
      setCommentsList([...commentsList, ...newComments]);
      setPage(page => page + 1);
    });
  }, [commentsList, page, token, website]);

  return [commentsList, loadMoreComments];
};
