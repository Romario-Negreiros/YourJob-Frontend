import React from 'react'

import { User } from '../../app/slices/user/interfaces'
import { Company } from '../../app/slices/company/interfaces'

export interface UserItem {
  text: string;
  icon: React.ReactElement
  renderComponent: (user: User, isCurrentUser?: boolean) => React.ReactElement
  active: boolean
}

export interface CompanyItem {
  text: string;
  icon: React.ReactElement
  renderComponent: (company: Company) => React.ReactElement
  active: boolean
}
