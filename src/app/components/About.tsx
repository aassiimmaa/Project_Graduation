import React from 'react'
import { Box, Typography, Container } from '@mui/material'

const About: React.FC = () => {
  return (
    <Container id='About' maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" component="h1" color="#000" fontWeight={600} pb={2} gutterBottom>
          Về Chúng Tôi
        </Typography>
        <Typography variant="body1" color="#000">
          Chúng tôi là dịch vụ cho thuê xe hàng đầu với nhiều năm kinh nghiệm
          cung cấp các phương tiện chất lượng. Dù bạn đang tìm kiếm xe máy tiết
          kiệm hay xe sang trọng, chúng tôi đều sẵn sàng phục vụ.
        </Typography>
      </Box>
    </Container>
  )
}

export default About
