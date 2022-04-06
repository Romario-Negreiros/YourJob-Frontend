import { Company } from '../../app/slices/company/interfaces'

export interface Props {
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg?: number;
  }
  company: Company
}
