import { makeStyles } from '@mui/styles'

import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => {
  return {
    paper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8
    }
  }
})

export default useStyles
