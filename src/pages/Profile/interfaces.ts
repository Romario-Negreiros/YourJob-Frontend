import React from 'react'

export interface Item {
  text: string;
  icon: React.ReactElement
  component: React.ReactElement
  active: boolean
}
