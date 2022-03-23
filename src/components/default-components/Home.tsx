import { CssBaseline, Container, Box, Paper, Typography } from '@mui/material'
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
          <Paper elevation={8}>
            <Typography variant="h5">
              Welcome to the NoCom extension!
            </Typography>
          </Paper>
        </Box>
      </Container>
    </div>
  )
}

export default Home