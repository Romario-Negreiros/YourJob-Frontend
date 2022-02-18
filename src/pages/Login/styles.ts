import { makeStyles } from '@mui/styles'

import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      background: 'red',
      [theme.breakpoints.up('md')]: {
        height: `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) * 1.5}px)`
      }
    }
  }
})

export default useStyles
