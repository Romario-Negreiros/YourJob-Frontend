import { makeStyles } from '@mui/styles'

import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => {
  return {
    grid: {
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      [theme.breakpoints.up('md')]: {
        height: `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) * 1.5}px)`
      }
    },
    box: {
      height: '100%',
      padding: '5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px'
    },
    link: {
      alignSelf: 'flex-start'
    },
    typography: {
      width: '100%',
      textAlign: 'center',
      [theme.breakpoints.up('lg')]: {
        fontSize: '20px !important'
      }
    },
    customFont: {
      color: theme.palette.secondary.dark,
      fontSize: '50px !important',
      [theme.breakpoints.up('md')]: {
        fontSize: '65px !important'
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '80px !important'
      }
    },
    clearOnSmallerScreen: {
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    }
  }
})

export default useStyles
