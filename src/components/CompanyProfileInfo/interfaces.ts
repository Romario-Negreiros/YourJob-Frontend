import { Company } from '../../app/slices/company/interfaces'

export interface Props {
  company: Company
  setCompany: (company: Company | null) => void
  isCurrentCompany?: boolean
}

export interface Inputs {
  description: string
  contactNumber: string
  website: string
  companyLogo: FileList
}
