import React from 'react'

import { AlertColor } from '@mui/material'

export interface ToastData {
  isOpen: boolean
  message: string
  severity: AlertColor
}

export interface ToastHandler {
  handleOpen: (message: string, severity: AlertColor) => void
}

const toastHandler = React.createContext<ToastHandler>({ handleOpen: () => {} })

export default toastHandler
