import React from 'react'

import { useLocation } from 'react-router-dom'

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()

  React.useEffect(() => {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }, [pathname])

  return null
}

export default ScrollToTop
