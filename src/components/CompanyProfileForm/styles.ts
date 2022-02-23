import { makeStyles } from '@mui/styles'

import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => {
  return {
    grid: {
      padding: '30px 0',
      width: '100% !important',
      [theme.breakpoints.up('sm')]: {
        padding: 0
      }
    }
  }
})

export default useStyles
