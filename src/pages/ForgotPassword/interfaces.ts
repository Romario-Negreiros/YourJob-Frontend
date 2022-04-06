import { AlertColor } from '@mui/material'

export interface Input {
  email: string
}

export interface Feedback {
  severity: AlertColor
  message: string
}
