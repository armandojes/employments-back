import validators from '../../helpers/validators'
import { auth, firestore } from '../../firestore'
import { errorsDic } from '../../../constants'

const updateCompany = async (data) => {
  const secureData = {
    companyAddress: data.companyAddress,
    companyEmail: data.companyEmail,
    companyName: data.companyName,
    companyPhone: data.companyPhone,
    companyRFC: data.companyRFC,
    companyRazonSocial: data.companyRazonSocial,
    userEmail: data.userEmail,
    userFullName: data.userFullName,
    password: data.password
  }

  if (validators.address(secureData.companyAddress)) {
    return { status: 'error', errorMessage: validators.address(secureData.companyAddress) }
  }

  if (validators.email(secureData.companyEmail)) {
    return { status: 'error', errorMessage: validators.email(secureData.companyEmail) }
  }

  if (validators.companyName(secureData.companyName)) {
    return { status: 'error', errorMessage: validators.companyName(secureData.companyName) }
  }

  if (validators.phone(secureData.companyPhone)) {
    return { status: 'error', errorMessage: validators.phone(secureData.companyPhone) }
  }

  if (validators.rfc(secureData.companyRFC)) {
    return { status: 'error', errorMessage: validators.rfc(secureData.companyRFC) }
  }

  if (validators.razonSocial(secureData.companyRazonSocial)) {
    return { status: 'error', errorMessage: validators.razonSocial(secureData.companyRazonSocial) }
  }

  if (validators.email(secureData.userEmail)) {
    return { status: 'error', errorMessage: validators.email(secureData.userEmail) }
  }

  if (validators.userFullName(secureData.userFullName)) {
    return { status: 'error', errorMessage: validators.userFullName(secureData.userFullName) }
  }

  if (validators.password(secureData.password)) {
    return { status: 'error', errorMessage: validators.password(secureData.password) }
  }

  if (secureData.password !== data.repassword) {
    return { status: 'error', errorMessage: 'las contraseñas no coinciden' }
  }

  try {
    await auth.updateUser(data.id, { email: secureData.userEmail, password: secureData.password })

    await firestore.doc(`users/${data.id}`).set({
      email: secureData.userEmail.toString().toLowerCase(),
      name: secureData.userFullName,
      fullName: secureData.userFullName,
      password: secureData.password,
      type: 'companyManager',
      updatedAt: new Date(),
      company: {
        address: data.companyAddress,
        email: data.companyEmail.toString().toLowerCase(),
        name: data.companyName,
        phone: data.companyPhone,
        rfc: data.companyRFC,
        razonSocial: data.companyRazonSocial
      }
    })

    return { status: 'success' }
  } catch (error) {
    return {
      ...error,
      errorMessage: errorsDic[error.errorInfo.code] || error.errorInfo.code,
      status: 'error'
    }
  }
}

export default updateCompany
