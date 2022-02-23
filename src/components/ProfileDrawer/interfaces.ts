import React from 'react'

interface Item {
  text: string
  icon: React.ReactElement
  component: React.ReactElement
  active: boolean
}

export interface Props {
  listItems: Item[]
  handleActiveItem: (newActiveItemIndex: number, oldActiveItemIndex: number) => void
  handleDrawerToggle?: () => void
}
