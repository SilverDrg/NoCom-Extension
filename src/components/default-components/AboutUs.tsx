import { Container, Box, Paper, Typography, Card, CardHeader, CardMedia, CardContent } from '@mui/material'
import React from 'react'
import Placeholder from '../../images/DogPlaceholder.jpg';

const AboutUs = () => {
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
        <Typography variant="h5" align="center" sx={{ m: 1, borderBottom: 2, borderColor: 'primary.dark'  }}>
          About us
        </Typography>
        <Typography variant="h6" align="left" sx={{ m: 1 }}>
          What is NoCom?
        </Typography>
        <Typography variant="body2" align="left" sx={{ p: 1, borderBottom: 2, borderColor: 'primary.dark' }}>
          NoCom is an extension enabling you to post comments on any website you visit, 
          without having to worry about censorship or manipulation.
        </Typography>
        <Typography variant="h6" align="left" sx={{ m: 1 }}>
          Who is working on NoCom?
        </Typography>
        <Typography variant="body2" align="left" sx={{ p: 1, borderBottom: 2, borderColor: 'primary.dark' }}>
          NoCom is currently being developed by one person as a university project.
        </Typography>
        <Card elevation={6} sx={{ m: 2 }}>
          <CardHeader title="Matija" 
            sx={{ 
              width:'90%',
              m: 'auto', 
              mb: 1, 
              p: 0.5, 
              borderBottom: 2, 
              borderColor: 'primary.main' 
              }}
          />
          <CardMedia image={ Placeholder } title="user image" sx={{ height: 160, width: 140, m: 'auto' }}/>
          <CardContent>
              <Typography variant="body1" 
                sx={{ 
                  pb: 1, 
                  pt: 1, 
                  borderTop: 2, 
                  borderBottom: 2, 
                  borderColor: 'primary.dark' 
                  }}
              >
                University of Maribor <br></br> 
                Faculty of Electrical Engineering and Computer Science <br></br>
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Student
              </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}

export default AboutUs