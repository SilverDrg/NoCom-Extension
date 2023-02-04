import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ColorModeContext } from '../session/ThemeContextProvider';

type RemoveCommetDialogProps = {
  open: boolean;
  onClose: () => void;
  removeComment: () => void;
};

export const RemoveCommentDialog = (props: RemoveCommetDialogProps) => {
  const { open, onClose, removeComment } = props;
  const { mode } = React.useContext(ColorModeContext);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove comment</DialogTitle>
      <DialogContent>Are you sure you wish to delete this comment?</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={mode === 'dark' ? 'secondary' : 'inherit'}>
          Cancel
        </Button>
        <Button onClick={removeComment} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
