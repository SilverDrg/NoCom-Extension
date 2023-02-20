import { Fab } from '@mui/material';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Link } from 'react-router-dom';
import { GeneralTooltip } from '../util/GeneralTooltip';

type CommentNewProps = {
  commentId?: string;
};

export const CommentNewButton = (props: CommentNewProps) => {
  const { commentId } = props;
  return (
    <GeneralTooltip title="New comment">
      <Fab
        color="primary"
        size="medium"
        component={Link}
        to={commentId ? `/comment-new/${commentId}` : '/comment-new'}
        sx={{ position: 'fixed', right: 8, bottom: 8 }}
      >
        <AddCommentIcon color="secondary" />
      </Fab>
    </GeneralTooltip>
  );
};
