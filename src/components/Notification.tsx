import { Snackbar } from '@mui/material'
import { NotificationProps } from './components.types'

const Notification = ({ open, onClose, message }: NotificationProps) => {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={5000}
      message={message}
    />
  )
}

export default Notification
