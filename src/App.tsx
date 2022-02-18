import React from 'react'

import { ThemeProvider } from '@mui/material/styles'
import { light } from './themes'
import { BrowserRouter } from 'react-router-dom'
import { ScrollToTop } from './components'
import Pages from './pages'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={light}>
        <ScrollToTop />
        <Pages />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
