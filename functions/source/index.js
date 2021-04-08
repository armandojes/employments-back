import createNewEmployment from './handlers/createNewEmployment'
import { https, firestore } from 'firebase-functions'
import deleteEmployment from './handlers/deleteEmployment'
import updateEmployment from './handlers/updateEmployment'
import createNewCompany from './handlers/createNewCompany'
import deleteCompany from './handlers/deleteCompany'
import updateCompany from './handlers/updateCompany'
import onNewAppointment from './handlers/onNewAppointment'

exports.createNewEmployment = https.onCall(createNewEmployment)
exports.deleteEmployment = https.onCall(deleteEmployment)
exports.updateEmployment = https.onCall(updateEmployment)
exports.createNewCompany = https.onCall(createNewCompany)
exports.deleteCompany = https.onCall(deleteCompany)
exports.updateCompany = https.onCall(updateCompany)

exports.onAppointmentCreate = firestore.document('appointments/{appointmentId}').onCreate(onNewAppointment)
