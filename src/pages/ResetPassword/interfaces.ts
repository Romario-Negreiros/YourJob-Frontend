import { AlertColor } from '@mui/material'

export interface Inputs {
  password: string
  confirmPassword: string
}

export interface Feedback {
  severity: AlertColor
  message: string
}
