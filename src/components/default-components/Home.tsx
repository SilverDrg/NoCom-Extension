import { Container, Box, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          }}
        >
          <Typography variant="h5">
            Welcome to NoCom!
          </Typography>
          <Typography variant="body2">
            Comment anywhere without restrictions.
          </Typography>
        </Box>
      </Container>
    </div>
  )
}

export default Home