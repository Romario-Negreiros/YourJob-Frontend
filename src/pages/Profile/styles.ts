import { makeStyles } from '@mui/styles'

import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => {
  return {
    box: {
      display: 'flex',
      minHeight: `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) * 2.2}px)`,
      [theme.breakpoints.up('sm')]: {
        height: `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) * 2.2}px)`
      }
    }
  }
})

export default useStyles
