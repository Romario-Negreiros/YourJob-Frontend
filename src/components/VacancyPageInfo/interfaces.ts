import { Vacancy } from '../../app/slices/company/interfaces'

export interface Props {
  vacancy: Vacancy
  setVacancy: (vacancy: Vacancy | null) => void
  isCurrentCompany?: boolean
}

export interface Inputs {
  description: string
  category: string
  position: string
  salary: any
}
