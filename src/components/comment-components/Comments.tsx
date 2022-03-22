import { Box, Container, CssBaseline } from '@mui/material'
import React from 'react'

const userComments = [
  {
    comment: "Neki komentar za testiranje",
    user: "Anonymous",
    likes: "1",
    nsfw: "false"
  },
  {
    comment: "Very nice comment owo",
    user: "Silver",
    likes: "1",
    nsfw: "false"
  },
  {
    comment: "Neki komentar za testiranje",
    user: "User123",
    likes: "1",
    nsfw: "false"
  },
  {
    comment: "A random comment for testing purposes",
    user: "Anonymous",
    likes: "1",
    nsfw: "false"
  }
]

const Comments = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
      >
      </Box>
    </Container>
  )
}

export default Comments