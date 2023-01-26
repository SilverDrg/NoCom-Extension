import React from 'react';
import { CommentModel } from '../models/Comment';
import { TokenContext } from '../components/session/TokenContextProvider';
import { apiFetchUserCommentsNew, apiFetchUserCommentsTop } from '../util/apiCalls';

type CommentListUserProps = {
  sortBy?: 'new' | 'top';
};

export const useCommentsListUser = (props: CommentListUserProps): [CommentModel[], () => void] => {
  const { sortBy } = props;
  const { token } = React.useContext(TokenContext);
  const [page, setPage] = React.useState(1);
  const [commentsList, setCommentsList] = React.useState<CommentModel[]>([]);

  React.useEffect(() => {
    if (sortBy == 'top') {
      apiFetchUserCommentsTop(token, 1).then(response => {
        setCommentsList(response.data);
      });
    } else {
      apiFetchUserCommentsNew(token, 1).then(response => {
        setCommentsList(response.data);
      });
    }
  }, [sortBy, token]);

  React.useDebugValue(commentsList ?? 'Loading...');

  const loadMoreComments = React.useCallback(() => {
    if (sortBy == 'top') {
      apiFetchUserCommentsTop(token, 1).then(response => {
        setCommentsList(response.data);
      });
    } else {
      apiFetchUserCommentsNew(token, page + 1).then(response => {
        const newComments: CommentModel[] = response.data;
        setCommentsList([...commentsList, ...newComments]);
        setPage(page => page + 1);
      });
    }
  }, [commentsList, page, sortBy, token]);

  return [commentsList, loadMoreComments];
};
