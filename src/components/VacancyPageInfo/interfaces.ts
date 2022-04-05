import { Vacancy, Company } from '../../app/slices/company/interfaces'

export interface Props {
  vacancy: Vacancy
  company: Company
  setVacancy: (vacancy: Vacancy | null) => void
  isCurrentCompany?: boolean
}

export interface Inputs {
  description: string
  category: string
  position: string
  salary: any
}
