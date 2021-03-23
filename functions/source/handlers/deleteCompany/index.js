import { auth, firestore } from '../../firestore'

const deleteCompany = async (data) => {
  try {
    const { companyId } = data

    if (!companyId) {
      return { status: 'error', errorMessage: 'Algun dato esta vacio' }
    }

    await auth.deleteUser(companyId)
    await firestore.doc(`users/${companyId}`).delete()

    return { status: 'success' }
  } catch (error) {
    return { status: 'error', errorMessage: error.toString() }
  }
}

export default deleteCompany
