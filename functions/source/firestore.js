import firebase from 'firebase-admin'

firebase.initializeApp()

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export default firestore
