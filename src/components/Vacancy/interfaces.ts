import { Vacancy } from '../../app/slices/company/interfaces'

export interface Props {
  breakpoints: {
    xs: number
    sm: number
    md: number
    lg?: number
  }
  vacancy: Vacancy
  companyName?: string
  companyLogo?: string
}
