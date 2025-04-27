import { Dialog, DialogContent } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { styleDialogContainer, styleImageDialog } from '~/app/shared/styles/AdminTable'

interface ModalProps {
  selectedImage: string
  close: (event: object, reason: 'backdropClick' | 'escapeKeyDown') => void
}

const ShowLargeImage = ({ selectedImage, close }: ModalProps) => {
  return (
    <Dialog sx={styleDialogContainer} open={!!selectedImage} onClose={close} maxWidth="md">
      <DialogContent>
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={selectedImage}
            width={800}
            height={500}
            style={styleImageDialog}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ShowLargeImage
