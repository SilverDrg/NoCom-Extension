import React from 'react';
import { AxiosResponse } from 'axios';
import { Box, Container, Button } from '@mui/material';
import { useCommentsList } from '../../hooks/useCommentsList';
import { Comment } from './Comment';
import { RemoveCommentDialog } from './RemoveCommentDialog';
import { apiFetchComments } from '../../util/apiCalls';
import { CommentFilters } from './CommentFilters';
import { ColorModeContext } from '../session/ThemeContextProvider';

type CommentsProps = {
  sortBy?: 'new' | 'old' | 'top';
  showFilter?: boolean;
  apiFetch?: (
    token: string | null,
    page: number,
    sortBy: string,
    nsfw: boolean,
    website: string | undefined,
  ) => Promise<AxiosResponse<any, any>>;
};

export const Comments = (props: CommentsProps) => {
  const { sortBy = 'new', showFilter = true, apiFetch = apiFetchComments } = props;
  const { mode } = React.useContext(ColorModeContext);
  const [sortByFilter, setSortByFilter] = React.useState(sortBy);
  const [nsfwFilter, setNsfwFilter] = React.useState(false);
  const [commentId, setCommentId] = React.useState<number>();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [InfiniteLoad, setInfiniteLoad] = React.useState(false);
  const [comments, loadMoreComments, removeComment] = useCommentsList({
    sortBy: sortByFilter,
    nsfw: nsfwFilter,
    apiFetch,
  });

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
    <Container
      component="main"
      maxWidth="xs"
      sx={{ pl: 1, pr: 1, backgroundColor: mode === 'ligh' ? '#f0f0f0' : 'inherit' }}
    >
      <RemoveCommentDialog open={openDialog} onClose={handleCloseDialog} removeComment={handleRemoveComment} />
      <Box
        sx={{
          width: '100%',
          marginTop: showFilter ? 0 : 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CommentFilters
          displaySortBy={showFilter}
          sortByFilter={sortByFilter}
          setSortByFilter={setSortByFilter}
          nsfwFilter={nsfwFilter}
          setNsfwFilter={setNsfwFilter}
        />
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
