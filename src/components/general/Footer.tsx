import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box sx={{ position: 'static', bottom: 0, mt: 2, pb: 2 }}>
      <Typography variant="body2">Copyright &copy; Argentum</Typography>
    </Box>
  );
};
