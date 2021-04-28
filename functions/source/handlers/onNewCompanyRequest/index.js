import newCompanyRegistered from '../../emailTemplates/newCompanyRegistered'
import sendEmail from '../../actions/sendEmail'
import { toLargeStringDate } from '../../helpers/dates'
import { log } from 'firebase-functions/lib/logger'
import { emailsForNotifications } from '../../../constants'

const onNewComanyRequestCreated = async (snapshot) => {
  try {
    const data = snapshot.data()

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

    for (const email of emailsForNotifications) {
      await sendEmail(email, 'Nueva empresa registrada', html)
    }
  } catch (error) {
    log('__Error__', error)
  }
}

export default onNewComanyRequestCreated
