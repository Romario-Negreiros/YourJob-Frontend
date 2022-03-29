import { Company } from '../../app/slices/company/interfaces'

export interface Props {
  company: Company
  setCompany: (company: Company | null) => void
}

export interface Inputs {
  description: string
  salary: any
  position: string
  category: string
}
