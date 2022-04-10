import { Fab } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Link } from 'react-router-dom';

const CommentNewButton = () => {
  return (
      <Fab color="primary" size="medium" component={Link} to={'/comment-new'} sx={{ position: 'fixed', right: 8, bottom: 8 }}>
        <AddCommentIcon color="secondary"/>
      </Fab>
  )
}

export default CommentNewButton