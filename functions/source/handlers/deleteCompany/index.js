import { auth, firestore } from '../../firestore'

const deleteCompany = async (data) => {
  try {
    const { companyId } = data

    if (!companyId) {
      return { status: 'error', errorMessage: 'Algun dato esta vacio' }
    }

    await auth.deleteUser(companyId)
    await firestore.doc(`users/${companyId}`).delete()

    // delete appoimtments for company
    try {
      const snaphotQeury = await firestore.collection('appointments').where('company.id', '==', companyId).get()
      for (const doc of snaphotQeury.docs) {
        await doc.ref.delete()
      }
    } catch (error) {
      console.log(error)
    }

    return { status: 'success' }
  } catch (error) {
    return { status: 'error', errorMessage: error.toString() }
  }
}

export default deleteCompany
