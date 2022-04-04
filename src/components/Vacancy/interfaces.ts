import { Vacancy, Company } from '../../app/slices/company/interfaces'
import { User } from '../../app/slices/user/interfaces'

export interface Props {
  breakpoints: {
    xs: number
    sm: number
    md: number
    lg?: number
  }
  vacancy: Vacancy
  company: Company
  currentUser?: User
  currentCompany?: Company
  setUser?: (user: User | null) => void
}
