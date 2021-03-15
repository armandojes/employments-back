/* eslint-disable no-unused-vars */
import { log } from 'firebase-functions/lib/logger'
import { auth, firestore } from '../../firestore'
import { errorsDic } from '../../../constants'

const createNewEmployment = async (data, context) => {
  const secureData = {
    name: data.name,
    lastName: data.lastName,
    email: data.email,
    password: data.password
  }

  if (!secureData.name || !secureData.lastName || !secureData.email || !secureData.password) {
    return { status: 'error', errorMessage: 'algun dato esta vacio' }
  }

  if (secureData.password.toString().length < 8) {
    return { status: 'error', errorMessage: 'La contraseña debe tener al menos 8 caracteres' }
  }

  try {
    const { uid } = await auth.createUser(secureData)
    await firestore.doc(`users/${uid}`).set({
      ...secureData,
      type: 'employment'
    })
  } catch (error) {
    return {
      ...error,
      errorMessage: errorsDic[error.errorInfo.code] || error.errorInfo.code,
      status: 'error'
    }
  }

  return { status: 'success' }
}

export default createNewEmployment
