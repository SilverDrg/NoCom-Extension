import React from 'react';
import { Box, Container, Button } from '@mui/material';
import { useCommentsListUser } from '../../hooks/useCommentsListUser';
import { Comment } from './Comment';

type CommentsUserProps = {
  sortBy: 'new' | 'top';
};

export const CommentsUser = (props: CommentsUserProps) => {
  const { sortBy } = props;
  const [InfiniteLoad, setInfiniteLoad] = React.useState(false);
  const [comments, loadMoreComments] = useCommentsListUser({ sortBy });

  const LoadMore = React.useCallback(() => {
    loadMoreComments();
    setInfiniteLoad(true);
  }, [loadMoreComments]);

  React.useEffect(() => {
    const ScrollLoad = (event: any) => {
      const bottom =
        event.target.scrollingElement.clientHeight + event.target.scrollingElement.scrollTop >=
        event.target.scrollingElement.scrollHeight - 5;
      if (bottom && InfiniteLoad) {
        loadMoreComments();
      }
    };

    window.addEventListener('scroll', ScrollLoad);

    return () => {
      window.removeEventListener('scroll', ScrollLoad);
    };
  }, [InfiniteLoad, loadMoreComments]);

  return (
    <Container maxWidth="xs" sx={{ pl: 1, pr: 1 }}>
      <Box
        sx={{
          width: '100%',
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {comments && comments.map((comment, index) => <Comment key={`${comment.id}-${index}`} comment={comment} />)}
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {!InfiniteLoad && (
          <Button variant="contained" onClick={LoadMore} color="secondary">
            Load more
          </Button>
        )}
      </Box>
    </Container>
  );
};
