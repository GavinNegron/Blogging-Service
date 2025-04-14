import { useRef, useState } from 'react'

interface ImageSelectorProps {
  onSelect?: (imageUrl: string) => void
}

export default function ImageSelector({ onSelect }: ImageSelectorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState('/placeholder.png')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
      onSelect?.(imageUrl)
    }
  }

  return (
    <>
      <img
        width={'100'}
        height={'100'}
        src={previewImage}
        alt="Selected preview"
        style={{ maxWidth: '100%' }}
        onClick={() => fileInputRef.current?.click()}
      />
      <input
        ref={fileInputRef}
        type="file"
        id="imageFile"
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </>
  )
}