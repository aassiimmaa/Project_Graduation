import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import { ABOUT_DESCRIPTION, ABOUT_US, ALIGN_CENTER, FONT_WEIGHT_BOLD, TEXT_COLOR } from '../shared/constant'
import { styleAboutContainer } from '../shared/styles/About'



const About: React.FC = () => {
  return (
    <Container id="About" maxWidth="md" sx={styleAboutContainer}>
      <Box textAlign={ALIGN_CENTER} mb={4}>
        <Typography
          variant="h4"
          component="h1"
          color={TEXT_COLOR}
          fontWeight={FONT_WEIGHT_BOLD}
          pb={2}
          gutterBottom
        >
          {ABOUT_US}
        </Typography>
        <Typography variant="body1" color={TEXT_COLOR}>
          {ABOUT_DESCRIPTION}
        </Typography>
      </Box>
    </Container>
  )
}

export default About
