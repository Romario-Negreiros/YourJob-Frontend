import { makeStyles } from '@mui/styles'

import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      minHeight: `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) * 1.5}px)`,
      [theme.breakpoints.up('sm')]: {
        height: `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) * 1.5}px)`
      }
    },
    paper: {
      height: '100%',
      padding: 15
    },
    form: {
      height: '100%',
      display: 'flex',
      flexFlow: 'row wrap'
    },
    buttonsWrapper: {
      display: 'flex',
      flexFlow: 'row wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 5,
      width: '100%',
      alignSelf: 'flex-end',
      [theme.breakpoints.up('sm')]: {
        gap: 0
      }
    },
    button: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 'fit-content'
      }
    }
  }
})

export default useStyles
