'use client'
import React from 'react'
import {
  Box,
  Typography,
  Button,
  Modal,
  Link,
  Container,
  Divider,
  Fade
} from '@mui/material'

//Style
const styleContainerContact = {
  my: 8,
  pt: 4,
  borderTop: '1px solid #ccc',
  textAlign: 'center'
}

const styleTitleContact = {
  fontWeight: 600,
  marginBottom: 2,
  color: '#000'
}

const styleDescriptionContact = {
  color: '#000',
  marginBottom: 3
}

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 620,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  color: '#000'
}

const styleTitleModal = { padding: '16px 32px' }

const styleDescriptionModal = { mb: 1 }

const styleHelpDescription = { pb: 2, fontWeight: 600 }

const styleCloseButtonModal = { margin: '16px 32px', float: 'right' }

const Contact: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {/* CTA Section */}
      <Container id="Contact" maxWidth="md" sx={styleContainerContact}>
        <Typography variant="h4" component="h2" sx={styleTitleContact}>
          Tại Sao Chọn AnRental?
        </Typography>
        <Typography variant="body1" sx={styleDescriptionContact}>
          Với nhiều lựa chọn xe và cam kết dịch vụ chất lượng, chúng tôi đảm bảo
          trải nghiệm thuê xe dễ dàng và thú vị. Đặt xe ngay hôm nay để tự tin
          di chuyển.
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleOpen}
        >
          Liên Hệ
        </Button>
      </Container>

      {/* Contact Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableScrollLock
      >
        <Fade in={open}>
          <Box sx={styleModal}>
            <Typography
              id="contact-modal-title"
              variant="h5"
              component="h2"
              fontWeight={700}
              sx={styleTitleModal}
            >
              Thông Tin Liên Hệ
            </Typography>
            <Divider />
            <Box sx={styleTitleModal}>
              <Typography sx={styleHelpDescription}>
                Mọi thắc mắc hoặc yêu cầu hỗ trợ, vui lòng liên hệ với chúng tôi
                qua:
              </Typography>
              <Typography sx={styleDescriptionModal}>
                <Box component="strong">Facebook: </Box>
                <Link
                  href="https://www.facebook.com/entian195"
                  target="_blank"
                  rel="noopener"
                >
                  https://www.facebook.com/entian195
                </Link>
              </Typography>
              <Typography sx={styleDescriptionModal}>
                <Box component="strong">Email: </Box>
                <Link href="mailto:nguyenthanhanvp2690@gmail.com">
                  nguyenthanhanvp2690@gmail.com
                </Link>
              </Typography>
              <Typography sx={styleDescriptionModal}>
                <Box component="strong">Hotline: </Box>
                <Link href="tel:+84 378 543 296">+84 378 543 296</Link>
              </Typography>
            </Box>
            <Divider />
            <Button
              variant="contained"
              color="primary"
              sx={styleCloseButtonModal}
              onClick={handleClose}
            >
              Đóng
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default Contact
