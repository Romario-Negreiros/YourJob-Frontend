import React from 'react'

import { ThemeProvider } from '@mui/material/styles'
import { light } from './themes'
import { BrowserRouter } from 'react-router-dom'
import { ScrollToTop } from './components'
import Pages from './pages'
import { Provider } from 'react-redux'
import store from './app/store'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={light}>
          <ScrollToTop />
          <Pages />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
