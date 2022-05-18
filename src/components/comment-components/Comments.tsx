import { Box, Container } from '@mui/material'
import Comment from './Comment';
import React from 'react'

const userComments = [
  {
    id: 1,
    comment: "Neki komentar za testiranje",
    username: "Anonymous",
    likes: "4",
    nsfw: "false"
  },
  {
    id: 2,
    comment: "Very nice comment owo",
    username: "Silver",
    likes: "2",
    nsfw: "true"
  },
  {
    id: 3,
    comment: "Neki komentar za testiranje",
    username: "User123",
    likes: "3",
    nsfw: "true"
  },
  {
    id: 4,
    comment: "A random comment for testing purposes",
    username: "Anonymous",
    likes: "1",
    nsfw: "false"
  },
  {
    id: 5,
    comment: "A random comment for testing purposes",
    username: "Anonymous",
    likes: "11",
    nsfw: "false"
  },
  {
    id: 6,
    comment: "A random comment for testing purposes",
    username: "Anonymous",
    likes: "111111",
    nsfw: "true"
  }
]

const Comments = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
      >
        {userComments.map((user) => (<Comment key={user.id} user={user}/>))}
      </Box>
    </Container>
  )
}

export default Comments