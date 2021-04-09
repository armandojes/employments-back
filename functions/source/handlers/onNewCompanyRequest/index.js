import firestore from '../../firestore'
import newCompanyRegistered from '../../emailTemplates/newCompanyRegistered'
import sendEmail from '../../actions/sendEmail'
import { toLargeStringDate } from '../../helpers/dates'
import { log } from 'firebase-functions/lib/logger'

const onNewComanyRequestCreated = async (snapshot) => {
  try {
    const data = snapshot.data()

    const adminsSnap = await firestore.collection('users').where('type', '==', 'admin').get()
    const admins = adminsSnap.docs.map((doc) => doc.data())

    const stringDate = toLargeStringDate(data.createdAt.toDate())
    const html = newCompanyRegistered(
      stringDate,
      data.companyAddress,
      data.companyName,
      data.companyRazonSocial,
      data.companyRFC,
      data.companyEmail,
      data.companyPhone,
      data.userEmail,
      data.userFullName
    )

    for (const admin of admins) {
      await sendEmail(admin.email, 'Nueva empresa registrada', html)
    }
  } catch (error) {
    log('__Error__', error)
  }
}

export default onNewComanyRequestCreated
