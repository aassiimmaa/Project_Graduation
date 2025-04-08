'use client'
import React, { useState } from 'react'
import Avatar from 'react-avatar-edit'

const Page = () => {
  const [src, setSrc] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const onClose = () => {
    setPreview(null)
  }

  const onCrop = (view: string) => {
    setPreview(view)
  }
  return (
    <>
      <Avatar
        width={390}
        height={295}
        onCrop={onCrop}
        onClose={onClose}
        src={src ?? undefined}
      />
      <img src={preview ?? undefined} alt="?" />
    </>
  )
}

export default Page
