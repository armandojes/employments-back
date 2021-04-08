import newAppointmentForCompany from '../../emailTemplates/newAppointmentForCompany'
import newAppointmentForOwners from '../../emailTemplates/newAppointmentForOwners'
import sendEmail from '../../actions/sendEmail'
import firestore from '../../firestore'
import { log } from 'firebase-functions/lib/logger'

const onNewAppointment = async (snapshot) => {
  try {
    const { id } = snapshot
    const data = snapshot.data()

    const branchDataSnap = await firestore.doc(`branches/${data.branch}`).get()
    const branchData = branchDataSnap.data()

    const companyDatSnapshot = await firestore.doc(`users/${data.company.id}`).get()
    const companyData = companyDatSnapshot.data()

    const htmlForCompany = newAppointmentForCompany(id, data.stringDate, data.patientName, data.stringTime, branchData.name, branchData.address, `https://iml-empresas.web.app/appointment/${id}`)
    const htmlForOwners = newAppointmentForOwners(id, data.stringDate, data.patientName, data.stringTime, branchData.name, branchData.address, 'https://iml-empresas.web.app/dashboard/appointments')

    await sendEmail(companyData.email, 'Confirmación de cita', htmlForCompany) // company

    const allUsersSnap = await firestore.collection('users').where('type', '!=', 'companyManager').get()
    const allUsers = allUsersSnap.docs.map((doc) => doc.data())

    // send email for branchOwner
    const branchOwners = allUsers.filter((user) => user.branchId === data.branch)
    for (const branchOwner of branchOwners) {
      await sendEmail(branchOwner.email, 'Nueva cita', htmlForOwners)
    }

    // send email for admins
    const admins = allUsers.filter((user) => user.type === 'admin')
    for (const admin of admins) {
      await sendEmail(admin.email, 'Nueva cita', htmlForOwners)
    }
  } catch (error) {
    log('__error__', error)
  }
}

export default onNewAppointment
