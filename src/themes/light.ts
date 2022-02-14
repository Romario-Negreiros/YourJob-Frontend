import { createTheme } from '@mui/material/styles'
import amber from '@mui/material/colors/amber'
import green from '@mui/material/colors/green'

const light = createTheme({
  palette: {
    mode: 'light',
    primary: amber,
    secondary: green,
    background: {
      default: '#fff4b0',
      paper: '#00c853'
    },
    text: {
      primary: '#121212',
      secondary: '#3b38ff'
    }
  }
})

export default light
