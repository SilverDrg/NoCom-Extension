import { Container, Paper, Typography } from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Container>
        <Paper>
          <Typography variant="h5">
            Welcome to the NoCom extension!
          </Typography>
        </Paper>
      </Container>
    </div>
  )
}

export default Home