import React from 'react'

import { light } from './themes'
import toastHandler, { ToastData } from './context/Toast'
import store from './app/store'

import { ScrollToTop } from './components'
import { ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'
import Pages from './pages'
import { Provider } from 'react-redux'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

import { AlertColor } from '@mui/material'

const App: React.FC = () => {
  const [toastData, setToastData] = React.useState<ToastData | null>(null)

  const handleOpen = (message: string, severity: AlertColor) => {
    setToastData({
      isOpen: true,
      message,
      severity
    })
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setToastData(null)
  }

  return (
    <BrowserRouter>
      <Snackbar open={toastData?.isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={toastData?.severity} sx={{ width: '100%' }}>
          {toastData?.message}
        </Alert>
      </Snackbar>
      <toastHandler.Provider value={{ handleOpen }}>
        <Provider store={store}>
          <ThemeProvider theme={light}>
            <ScrollToTop />
            <Pages />
          </ThemeProvider>
        </Provider>
      </toastHandler.Provider>
    </BrowserRouter>
  )
}

export default App
