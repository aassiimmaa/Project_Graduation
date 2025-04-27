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
import {
  CLOSE,
  CONTACT,
  CONTACT_DESCRIPTION,
  CONTACT_INFO_HELP,
  CONTACT_INFO_TITLE,
  CONTACT_TITLE,
  EMAIL,
  FACEBOOK,
  FACEBOOK_LINK,
  HOTLINE,
  MY_EMAIL,
  MY_PHONENUM,
  PRIMARY_COLOR,
  VARIANT_BUTTON,
  VARIANT_INPUT
} from '../shared/constant'
import {
  styleCloseButtonModal,
  styleContainerContact,
  styleDescriptionContact,
  styleDescriptionModal,
  styleHelpDescription,
  styleModal,
  styleTitleContact,
  styleTitleModal
} from '../shared/styles/Contact'

const Contact: React.FC = () => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      {/* CTA Section */}
      <Container id="Contact" maxWidth="md" sx={styleContainerContact}>
        <Typography variant="h4" component="h2" sx={styleTitleContact}>
          {CONTACT_TITLE}
        </Typography>
        <Typography variant="body1" sx={styleDescriptionContact}>
          {CONTACT_DESCRIPTION}
        </Typography>
        <Button
          variant={VARIANT_INPUT}
          color={PRIMARY_COLOR}
          size="large"
          onClick={handleOpen}
        >
          {CONTACT}
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
              {CONTACT_INFO_TITLE}
            </Typography>
            <Divider />
            <Box sx={styleTitleModal}>
              <Typography sx={styleHelpDescription}>
                {CONTACT_INFO_HELP}
              </Typography>
              <Typography sx={styleDescriptionModal}>
                <Box component="strong">{`${FACEBOOK}: `} </Box>
                <Link href={FACEBOOK_LINK} target="_blank" rel="noopener">
                  {FACEBOOK_LINK}
                </Link>
              </Typography>
              <Typography sx={styleDescriptionModal}>
                <Box component="strong">{`${EMAIL}: `} </Box>
                <Link href="mailto:nguyenthanhanvp2690@gmail.com">
                  {MY_EMAIL}
                </Link>
              </Typography>
              <Typography sx={styleDescriptionModal}>
                <Box component="strong">{`${HOTLINE}: `}</Box>
                <Link href="tel:+84 378 543 296">{MY_PHONENUM}</Link>
              </Typography>
            </Box>
            <Divider />
            <Button
              variant={VARIANT_BUTTON}
              color={PRIMARY_COLOR}
              sx={styleCloseButtonModal}
              onClick={handleClose}
            >
              {CLOSE}
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default Contact
