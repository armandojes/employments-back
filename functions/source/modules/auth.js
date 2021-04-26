import firestore from '../firestore'

const auth = (handler) => async (data, context) => {
  if (!context.auth || !context.auth.uid) {
    return { status: 'error', errorMessage: 'User not authenticated' }
  }

  const snapshot = await firestore.doc(`users/${context.auth.uid}`).get()
  const userData = snapshot.data()

  if (!userData || userData.type !== 'admin') {
    return {
      error: true,
      errorMessage: 'user has no permisions for this action'
    }
  }
  return handler(data, context)
}

export default auth
