import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box sx={{ position: 'static', bottom: 0, pt: 1, pb: 1 }}>
      <Typography variant="body2">Copyright &copy; Argentum</Typography>
    </Box>
  );
};
