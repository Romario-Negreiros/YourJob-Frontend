import { makeStyles } from '@mui/styles'

import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => {
  return {
    box: {
      background: theme.palette.primary.dark,
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 5,
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        gap: 0
      }
    }
  }
})

export default useStyles
