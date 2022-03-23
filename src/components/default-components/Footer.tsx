import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Box sx={{ position: 'static', bottom: 0 , mt: 4, pb: 2 }}>
      <Typography variant="body2">
        Copyright &copy; Argentum
      </Typography>
    </Box>
  )
}

export default Footer