import { Modal } from '@/shared/ui/modal'
import { useState, JSX } from 'react'
import { Content } from '@/features/reset-password/ui/content'

type Props = {
  renderOpenEl: ((handleOpen: () => void) => JSX.Element)
}

export const ResetPasswordModal = (props: Props) => {
  const { renderOpenEl } = props
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }
  return (
    <>
      {renderOpenEl(handleOpen)}
      <Modal open={isOpen} onClose={handleClose}>
        <Content handleClose={handleClose}/>
      </Modal>
    </>

  )
}
