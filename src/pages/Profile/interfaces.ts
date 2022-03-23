import React from 'react'

export interface UserItem {
  text: string;
  icon: React.ReactElement
  renderComponent: (...args: any) => React.ReactElement
  active: boolean
}

export interface CompanyItem {
  text: string;
  icon: React.ReactElement
  renderComponent: (...args: any) => React.ReactElement
  active: boolean
}
