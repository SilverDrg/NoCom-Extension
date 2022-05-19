import { Container, Box, Typography, Card, CardHeader, CardMedia, CardContent } from '@mui/material'
import Placeholder from '../../images/DogPlaceholder.jpg'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs" sx={{ p: 0 }}>
        <Box
          sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          }}
        >
          <Typography variant="h5" sx={{ mt: 2 }}>
            Welcome to NoCom!
          </Typography>
          <Typography variant="body2" sx={{ mb: 5, borderBottom: 2, borderColor: 'primary.dark' }}>
            Comment anywhere without restrictions.
          </Typography>

          <Typography variant="h6" align="left" sx={{ m: 1 }}>
            What is NoCom?
          </Typography>
          <Typography variant="body2" align="left" sx={{ p: 2, borderTop: 2, borderColor: 'primary.dark' }}>
            NoCom is an extension enabling you to post comments on any website you visit, 
            without having to worry about censorship or manipulation.
          </Typography>
          <Typography variant="h6" align="left" sx={{ m: 1 }}>
            Who is working on NoCom?
          </Typography>
          <Typography variant="body2" align="left" sx={{ p: 2, borderTop: 2, borderColor: 'primary.dark' }}>
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
    </div>
  )
}

export default Home