import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Checkbox, IconButton, useTheme, CircularProgress, Button } from '@mui/material';
import { pink } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

import { CommentReplies } from './CommentReplies';
import { ColorModeContext } from '../session/ThemeContextProvider';
import { TokenContext } from '../session/TokenContextProvider';
import { CommentModel } from '../../models/Comment';
import { useLoggedIn } from '../../hooks/useLoggedIn';
import { apiFetchComment, apiSetLike } from '../../util/apiCalls';
import { CommentNewButton } from './CommentNewButton';
import { GeneralTooltip } from '../util/GeneralTooltip';
import { BackButton } from '../util/BackButton';

const commentDisplay: CommentModel = {
  id: 1,
  username: 'user',
  likes: 0,
  content: 'Hello random content',
  nsfw: true,
  replyTo: null,
  createdAt: 'today',
  updatedAt: 'today',
  encryptedUrl: '',
  isOwner: true,
  repliesCount: 0,
  replies: [],
  isDeleted: false,
  isLiked: false,
};

export const CommentDisplay = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const params = useParams();
  const isLoggedIn = useLoggedIn();
  const { mode } = React.useContext(ColorModeContext);
  const { token } = React.useContext(TokenContext);
  const [comment, setComment] = React.useState(commentDisplay);
  const [like, setLike] = React.useState(comment.isLiked ?? false);
  const [likesCount, setLikesCount] = React.useState(comment.likes);
  let isNSFW, isCommentOwner;

  React.useLayoutEffect(() => {
    if (!params.id) return;
    apiFetchComment(token, params.id).then(response => {
      setComment(response.data);
      setLike(response.data.isLiked);
      setLikesCount(response.data.likes);
    });
  }, [params.id, token]);

  const handleLike = () => {
    if (!isLoggedIn) return;
    apiSetLike(token, comment.id, !like).then(response => {
      if (typeof response.data === 'number') setLikesCount(response.data);
    });
    setLike(like => !like);
  };

  const handleViewReplies = () => {
    navigate(`/comments/${comment.id}`);
  };

  const handleParent = () => {
    if (!comment.replyTo) return;
    navigate(`/comments/${comment.replyTo}`);
  };

  if (comment.nsfw) {
    isNSFW = (
      <Grid item>
        <Typography variant="button" color="red" sx={{ p: 1, display: 'inline-block' }}>
          NSFW
        </Typography>
      </Grid>
    );
  }

  if (comment.isOwner) {
    isCommentOwner = (
      <Grid item xs>
        <Grid container direction="row-reverse">
          <Grid item>
            <IconButton
              color="error"
              aria-label="commentOwner"
              component="label"
              onClick={handleViewReplies}
              sx={{ mr: 0.5 }}
            >
              <DeleteOutlineOutlinedIcon
                sx={{
                  '&.MuiSvgIcon-root': { fontSize: 18 },
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return comment ? (
    <>
      <Box sx={{ ml: 2, mt: 1, alignContent: 'flex-start', display: 'flex', spacing: 3 }}>
        <BackButton btnSize="small" fontSize="small" />
        {!!comment.replyTo && (
          <GeneralTooltip title="Thread">
            <Button
              sx={{ width: 42, minWidth: 36, ml: 1 }}
              variant="contained"
              onClick={handleParent}
              color="secondary"
              size="small"
            >
              <ForumOutlinedIcon color="primary" fontSize="small" />
            </Button>
          </GeneralTooltip>
        )}
      </Box>
      <Box>
        <Paper key={comment.id} elevation={3} sx={{ m: 1, mt: 1, p: 0.5 }}>
          <Typography
            variant="body1"
            align="left"
            sx={{
              m: 1,
              borderBottom: 1,
              borderColor: mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.light,
            }}
          >
            {comment.username}
          </Typography>
          <Typography variant="body2" align="left" sx={{ m: 1, whiteSpace: 'pre-line' }}>
            {comment.content}
          </Typography>
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="start" spacing={2}>
                {!comment.isDeleted && (
                  <Grid item>
                    <IconButton
                      color={mode === 'dark' ? 'secondary' : 'default'}
                      aria-label="replies"
                      component="label"
                      onClick={handleViewReplies}
                    >
                      <ChatBubbleOutlineIcon
                        sx={{
                          '&.MuiSvgIcon-root': { fontSize: 18 },
                        }}
                      />
                    </IconButton>
                    <Typography variant="body2" align="left" sx={{ p: 1, pl: 0, display: 'inline-block' }}>
                      {comment.repliesCount}
                    </Typography>
                  </Grid>
                )}
                {!comment.isDeleted && (
                  <Grid item>
                    <Checkbox
                      icon={<FavoriteBorderIcon />}
                      checkedIcon={<FavoriteIcon />}
                      value="like"
                      checked={like}
                      onChange={handleLike}
                      sx={{
                        color: 'primary',
                        '&.Mui-checked': {
                          color: pink[600],
                        },
                        '& .MuiSvgIcon-root': { fontSize: 18 },
                      }}
                    />
                    <Typography
                      variant="body2"
                      align="left"
                      sx={{ p: 1, pl: 0, display: 'inline-block' }}
                      color={like ? pink[500] : ''}
                    >
                      {likesCount}
                    </Typography>
                  </Grid>
                )}
                {isNSFW}
                {!comment.isDeleted && isCommentOwner}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <CommentReplies mainCommentId={comment.id.toString()} />
      <CommentNewButton commentId={comment.id.toString()} />
    </>
  ) : (
    <CircularProgress />
  );
};
