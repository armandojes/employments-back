/* eslint-disable no-unused-vars */
import { log } from 'firebase-functions/lib/logger'
import { auth, firestore } from '../../firestore'

const deleteEmployment = async (data, context) => {
  try {
    const { employmentId } = data

    if (!employmentId) {
      return { status: 'error', errorMessage: 'Algun dato esta vacio' }
    }

    await auth.deleteUser(employmentId)
    await firestore.doc(`users/${employmentId}`).delete()

    return { status: 'success' }
  } catch (error) {
    return { status: 'error', errorMessage: 'Error interno del servidor' }
  }
}

export default deleteEmployment
