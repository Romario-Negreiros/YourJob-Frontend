import { Company } from '../../app/slices/company/interfaces'

export interface Props {
  company: Company
  setCompany: (company: Company | null) => void
}

export interface Inputs {
  comment: string
  grade: number
  recommendation: string
}
