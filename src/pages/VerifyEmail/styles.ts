import { makeStyles } from '@mui/styles'

import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => {
  return {
    box: {
      display: 'grid',
      placeItems: 'center',
      minHeight: `calc(100vh - ${Number(theme.mixins.toolbar.minHeight) * 4}px)`
    },
    paper: {
      padding: 10,
      maxWidth: 700,
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
      gap: 10
    },
    link: {
      margin: '20px auto 0 auto'
    }
  }
})

export default useStyles
