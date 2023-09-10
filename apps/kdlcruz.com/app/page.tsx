'use client'

import { Avatar, Box, Grid, Typography } from '@mui/material'
import { ReactTyped } from './components/ReactTyped'
import React from 'react'
import BgParticles from './partials/particles'

export default async function Index() {
  return (
    <Box sx={{
      background: 'url(/cover-bg.jpg) no-repeat center center fixed rgba(76, 175, 80, 0.3)',
      "-webkit-background-size": 'cover',
      "-moz-background-size": 'cover',
      "-o-background-size": 'cover',
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh',
      display: 'block'
    }}>
      <BgParticles />
      <Box top="50%" left="50%" position="absolute" width="100vw" textAlign="center" zIndex={1} sx={{ 
        transform: "translate(-50%,-50%)"
      }}>
        <Grid container justifyContent="center">
          <Avatar sx={{ width: 120, height: 120 }} src="../avatar.jpg" alt="kdlcruz" />
        </Grid>
        <Typography color="primary" variant="h4">
          <ReactTyped strings={["Kevin Jay Dela Cruz"]} typeSpeed={40} />
        </Typography>

        <Typography color="primary">
          <ReactTyped strings={[
            "Tools are used for solved problems!",
            "Some of my tools",
            "Server Side: NodeJS, PHP, HapiJS, Laravel...",
            "Client Side: Typescript, ReactJS, React Native, JQuery...",
            'Check "My tools" for complete lists.'
          ]} typeSpeed={50} backSpeed={60} loop />
        </Typography>

        <Typography color="secondary" textTransform="uppercase" variant="h5">
          <ReactTyped
            strings={[
              "Frontend Developer",
              "Backend Developer",
              "React Native Developer",
              "Fullstack Developer"
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </Typography>

        
      </Box>
    </Box>
  )
}
