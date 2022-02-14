import React from 'react'

import { makeStyles } from '@mui/styles'

import Header from './Header'
import { Outlet } from 'react-router-dom'

import { Theme } from '@mui/material'

const useStyles = makeStyles((theme: Theme) => {
  return {
    toolbar: theme.mixins.toolbar
  }
})

const Layout: React.FC = () => {
  const classes = useStyles()

  return (
    <>
      <Header />
      <div className={classes.toolbar}></div>
      <Outlet />
    </>
  )
}

export default Layout
