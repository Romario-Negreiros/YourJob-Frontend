import { storage } from '../../../lib/firebase'

import { User } from '../../../app/slices/user/interfaces'
import { Inputs } from '../interfaces'

const updateData = async (user: User, data: Inputs): Promise<User> => {
  const userCopy: User = JSON.parse(JSON.stringify(user))
  if (data.profilePicture[0]) {
    const storageRef = storage.ref(storage.storage, `users/${user.email}/profilePicture`)
    await storage.uploadBytes(storageRef, data.profilePicture[0])
    userCopy.profilePicture = await storage.getDownloadURL(storageRef)
  }
  if (data.curriculum[0]) {
    const storageRef = storage.ref(storage.storage, `users/${user.email}/curriculum`)
    await storage.uploadBytes(storageRef, data.curriculum[0])
    userCopy.curriculum = await storage.getDownloadURL(storageRef)
  }
  const dataCopy: Partial<User> = JSON.parse(JSON.stringify(data))
  delete dataCopy.profilePicture
  delete dataCopy.curriculum

  const updatedUser: User = { ...userCopy, ...dataCopy }
  return updatedUser
}

export default updateData
