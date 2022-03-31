import { Vacancy, Company } from '../../app/slices/company/interfaces'

export interface Props {
  breakpoints: {
    xs: number
    sm: number
    md: number
    lg?: number
  }
  vacancy: Vacancy
  company: Company
}
