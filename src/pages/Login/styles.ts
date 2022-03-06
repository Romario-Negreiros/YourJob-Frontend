import { makeStyles } from '@mui/styles'

import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => {
  return {
    container: {
      display: 'flex !important',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      minHeight: `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) * 3}px)`
    },
    paper: {
      height: '100%',
      width: 400,
      padding: 15
    },
    form: {
      height: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    actions: {
      alignSelf: 'flex-end'
    }
  }
})

export default useStyles
