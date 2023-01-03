import React from 'react';
import { Box, Container, Button } from "@mui/material";
import { useCommentsList } from "../../hooks/useCommentsList";
import { Comment } from "./Comment";

export const Comments = () => {
  const [InfiniteLoad, setInfiniteLoad] = React.useState(false);
  const [comments, loadMoreComments] = useCommentsList();

  const LoadMore = React.useCallback(() => {
    loadMoreComments();
    setInfiniteLoad(true);
  }, [loadMoreComments])

  React.useEffect(() => {
    const ScrollLoad = (event: any) => {
      const bottom = event.target.scrollingElement.clientHeight + event.target.scrollingElement.scrollTop >= event.target.scrollingElement.scrollHeight - 5;
      if(bottom && InfiniteLoad){
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
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {comments &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button variant="contained" onClick={LoadMore} color="secondary">Load more</Button>
      </Box>
    </Container>
  );
};
