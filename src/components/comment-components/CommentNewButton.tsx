import { Box, Fab } from '@mui/material'
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Link } from 'react-router-dom';

const CommentNewButton = () => {
  return (
    <Box sx={{ position: 'sticky', backgroundColor: 'secondary.main'}}>
      <Fab color="primary" size="medium" component={Link} to={'/comment-new'} sx={{ position: 'absolute', right: 0, bottom: -64 }}>
        <AddCommentIcon color="secondary"/>
      </Fab>
    </Box>
  )
}

export default CommentNewButton