import newAppointment from '../../emailTemplates/newAppointment'
import sendEmail from '../../actions/sendEmail'
import firestore from '../../firestore'
import { log } from 'firebase-functions/lib/logger'
import { emailsForNotifications } from '../../../constants'

const onNewAppointment = async (snapshot) => {
  try {
    const { id } = snapshot
    const data = snapshot.data()

    const branchDataSnap = await firestore.doc(`branches/${data.branch}`).get()
    const branchData = branchDataSnap.data()

    const companyDatSnapshot = await firestore.doc(`users/${data.company.id}`).get()
    const companyData = companyDatSnapshot.data()

    let studies = data.studies
    if (data.otherStudy) {
      studies.push({ title: data.otherStudy, price: 0, indications: null })
    }
    if (data.profiles && data.profiles.length) {
      studies = [...studies, ...data.profiles]
    }

    const htmlForEmails = newAppointment(
      id,
      data.stringDate,
      data.patientName,
      data.stringTime,
      branchData.name,
      branchData.address,
      studies,
      branchData.mapPicture || null,
      branchData.maps || null
    )

    await sendEmail(companyData.email, 'Confirmación de cita', htmlForEmails) // company

    const allUsersSnap = await firestore.collection('users').where('type', '!=', 'companyManager').get()
    const allUsers = allUsersSnap.docs.map((doc) => doc.data())

    // send email for branchOwner
    const branchOwners = allUsers.filter((user) => user.branchId === data.branch)
    for (const branchOwner of branchOwners) {
      await sendEmail(branchOwner.email, 'Nueva cita', htmlForEmails)
    }

    for (const email of emailsForNotifications) {
      await sendEmail(email, 'Nueva cita', htmlForEmails)
    }
  } catch (error) {
    log('__error__', error)
  }
}

export default onNewAppointment
