import React from 'react';
import { Box, Container, Button } from '@mui/material';
import { useCommentsList } from '../../hooks/useCommentsList';
import { Comment } from './Comment';
import { RemoveCommentDialog } from './RemoveCommentDialog';

export const Comments = () => {
  const [commentId, setCommentId] = React.useState<number>();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [InfiniteLoad, setInfiniteLoad] = React.useState(false);
  const [comments, loadMoreComments, removeComment] = useCommentsList();

  const handleCloseDialog = React.useCallback(() => {
    setOpenDialog(false);
  }, []);

  const handleOpenDialog = React.useCallback((commentId: number) => {
    setCommentId(commentId);
    setOpenDialog(true);
  }, []);

  const handleRemoveComment = React.useCallback(() => {
    if (!commentId) return;
    removeComment(commentId);
    setOpenDialog(false);
  }, [commentId, removeComment]);

  const LoadMore = React.useCallback(() => {
    loadMoreComments();
    setInfiniteLoad(true);
  }, [loadMoreComments]);

  React.useEffect(() => {
    const ScrollLoad = (event: any) => {
      const bottom =
        event.target.scrollingElement.clientHeight + event.target.scrollingElement.scrollTop >=
        event.target.scrollingElement.scrollHeight - 60;
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
    <Container component="main" maxWidth="xs" sx={{ pl: 1, pr: 1 }}>
      <RemoveCommentDialog open={openDialog} onClose={handleCloseDialog} removeComment={handleRemoveComment} />
      <Box
        sx={{
          width: '100%',
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {comments &&
          comments.map((comment, index) => (
            <Comment
              key={`${comment.id}-${index}`}
              comment={comment}
              deleteComment={() => handleOpenDialog(comment.id)}
            />
          ))}
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
