import createNewEmployment from './handlers/createNewEmployment'
import { https, firestore } from 'firebase-functions'
import deleteEmployment from './handlers/deleteEmployment'
import updateEmployment from './handlers/updateEmployment'
import createNewCompany from './handlers/createNewCompany'
import deleteCompany from './handlers/deleteCompany'
import updateCompany from './handlers/updateCompany'
import onNewAppointment from './handlers/onNewAppointment'
import onNewComanyRequestCreated from './handlers/onNewCompanyRequest'
import auth from './modules/auth'
import test from './handlers/test'

exports.createNewEmployment = https.onCall(auth(createNewEmployment))
exports.deleteEmployment = https.onCall(auth(deleteEmployment))
exports.updateEmployment = https.onCall(auth(updateEmployment))
exports.createNewCompany = https.onCall(auth(createNewCompany))
exports.deleteCompany = https.onCall(auth(deleteCompany))
exports.updateCompany = https.onCall(auth(updateCompany))
exports.test = https.onRequest(test)

exports.onAppointmentCreate = firestore.document('appointments/{appointmentId}').onCreate(onNewAppointment)
exports.onNewComanyRequestCreated = firestore.document('requestNewCompanies/{companyId}').onCreate(onNewComanyRequestCreated)
