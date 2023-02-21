import React from 'react';
import { Box, Container, Button, debounce } from '@mui/material';
import { useRepliesList } from '../../hooks/useReplies';
import { Comment } from './Comment';
import { RemoveCommentDialog } from './RemoveCommentDialog';
import { apiFetchReplies } from '../../util/apiCalls';
import { CommentFilters } from './CommentFilters';
import { ColorModeContext } from '../session/ThemeContextProvider';

type CommentRepliesProps = {
  mainCommentId: string;
  sortBy?: 'new' | 'old' | 'top';
  showFilter?: boolean;
};

export const CommentReplies = (props: CommentRepliesProps) => {
  const { mainCommentId, sortBy = 'new', showFilter = true } = props;
  const { mode } = React.useContext(ColorModeContext);
  const [sortByFilter, setSortByFilter] = React.useState(sortBy);
  const [nsfwFilter, setNsfwFilter] = React.useState(false);
  const [commentId, setCommentId] = React.useState<number>();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [InfiniteLoad, setInfiniteLoad] = React.useState(false);
  const [replies, loadMoreComments, removeComment] = useRepliesList({
    commentId: mainCommentId,
    sortBy: sortByFilter,
    nsfw: nsfwFilter,
    apiFetch: apiFetchReplies,
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
      console.log('first part: ', event.target.scrollingElement.clientHeight + event.target.scrollingElement.scrollTop);
      console.log('second part: ', event.target.scrollingElement.scrollHeight - 60);
      const bottom =
        event.target.scrollingElement.clientHeight + event.target.scrollingElement.scrollTop >=
        event.target.scrollingElement.scrollHeight - 60;
      if (bottom && InfiniteLoad) {
        loadMoreComments();
      }
    };

    window.onscroll = debounce(ScrollLoad, 500);
  }, [InfiniteLoad, loadMoreComments]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ pl: 1, pr: 1, pb: 1, backgroundColor: mode === 'ligh' ? '#f0f0f0' : 'inherit' }}
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
        {replies.length > 0 && (
          <CommentFilters
            displaySortBy={showFilter}
            sortByFilter={sortByFilter}
            setSortByFilter={setSortByFilter}
            nsfwFilter={nsfwFilter}
            setNsfwFilter={setNsfwFilter}
          />
        )}
        {replies &&
          replies.map((comment, index) => (
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
        {!InfiniteLoad && replies.length >= 10 && (
          <Button variant="contained" onClick={LoadMore} color="secondary" size="small">
            Load more
          </Button>
        )}
      </Box>
    </Container>
  );
};
