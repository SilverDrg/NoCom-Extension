import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Typography,
  Checkbox,
  IconButton,
  useTheme,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { ColorModeContext } from "../session/ThemeContextProvider";
import { CommentModel } from "../../models/Comment";
import { useLoggedIn } from "../../hooks/useLoggedIn";

export const Comment = (props: any) => {
  const comment: CommentModel = props.comment;
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoggedIn] = useLoggedIn();
  const { mode } = React.useContext(ColorModeContext);
  const [Like, setLike] = React.useState(false);
  let isNSFW, isCommentOwner;

  const handleLike = () => {
    if (!isLoggedIn) return;
    setLike((like) => !like);
  };

  const handleViewReplies = () => {
    navigate(`/comments/${comment.id}`);
  };

  if (comment.nsfw) {
    isNSFW = (
      <Grid item xs={3} md={3}>
        <Typography variant='button' color='red'>
          NSFW
        </Typography>
      </Grid>
    );
  }

  if (comment.isOwner) {
    isCommentOwner = (
      <Grid item xs>
        <Grid container direction='row-reverse'>
          <Grid item>
            <IconButton
              color='error'
              aria-label='commentOwner'
              component='label'
              onClick={handleViewReplies}
              sx={{ mr: 0.5 }}
            >
              <DeleteOutlineOutlinedIcon
                sx={{
                  "&.MuiSvgIcon-root": { fontSize: 18 },
                }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <Paper key={comment.id} elevation={3} sx={{ m: 2, p: 0.5 }}>
      <Typography
        variant='body1'
        align='left'
        sx={{
          m: 1,
          borderBottom: 1,
          borderColor:
            mode === "light"
              ? theme.palette.primary.main
              : theme.palette.secondary.light,
        }}
      >
        {comment.username}
      </Typography>
      <Typography variant='body2' align='left' sx={{ m: 1 }}>
        {comment.content}
      </Typography>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent='start' spacing={2}>
            <Grid item>
              <IconButton
                color={mode === "dark" ? "secondary" : "default"}
                aria-label='replies'
                component='label'
                onClick={handleViewReplies}
              >
                <ChatBubbleOutlineIcon
                  sx={{
                    "&.MuiSvgIcon-root": { fontSize: 18 },
                  }}
                />
              </IconButton>
              <Typography
                variant='body2'
                align='left'
                sx={{ p: 1, pl: 0, display: "inline-block" }}
              >
                {comment.repliesCount}
              </Typography>
            </Grid>
            <Grid item>
              <Checkbox
                icon={<FavoriteBorderIcon />}
                checkedIcon={<FavoriteIcon />}
                value='like'
                checked={Like}
                onChange={handleLike}
                sx={{
                  color: "primary",
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                  "& .MuiSvgIcon-root": { fontSize: 18 },
                }}
              />
              <Typography
                variant='body2'
                align='left'
                sx={{ p: 1, pl: 0, display: "inline-block" }}
                color={Like ? pink[500] : ""}
              >
                {comment.likes}
              </Typography>
            </Grid>
            {isNSFW}
            {isCommentOwner}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
