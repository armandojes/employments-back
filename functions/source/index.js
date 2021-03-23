import createNewEmployment from './handlers/createNewEmployment'
import { https } from 'firebase-functions'
import deleteEmployment from './handlers/deleteEmployment'
import updateEmployment from './handlers/updateEmployment'
import createNewCompany from './handlers/createNewCompany'
import deleteCompany from './handlers/deleteCompany'

exports.createNewEmployment = https.onCall(createNewEmployment)
exports.deleteEmployment = https.onCall(deleteEmployment)
exports.updateEmployment = https.onCall(updateEmployment)
exports.createNewCompany = https.onCall(createNewCompany)
exports.deleteCompany = https.onCall(deleteCompany)
