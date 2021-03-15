import createNewEmployment from './handlers/createNewEmployment'
import { https } from 'firebase-functions'
import deleteEmployment from './handlers/deleteEmployment'
import updateEmployment from './handlers/updateEmployment'

exports.createNewEmployment = https.onCall(createNewEmployment)
exports.deleteEmployment = https.onCall(deleteEmployment)
exports.updateEmployment = https.onCall(updateEmployment)
