import { storage } from '../../../lib/firebase'

import { Company } from '../../../app/slices/company/interfaces'
import { Inputs } from '../interfaces'

const updateData = async (company: Company, data: Inputs): Promise<Company> => {
  const companyCopy: Company = JSON.parse(JSON.stringify(company))
  if (data.companyLogo[0]) {
    const storageRef = storage.ref(storage.storage, `companies/${company.email}/profilePicture`)
    await storage.uploadBytes(storageRef, data.companyLogo[0])
    companyCopy.companyLogo = await storage.getDownloadURL(storageRef)
  }
  const dataCopy: Partial<Company> = JSON.parse(JSON.stringify(data))
  delete dataCopy.companyLogo

  const updatedCompany: Company = { ...companyCopy, ...dataCopy }
  return updatedCompany
}

export default updateData
