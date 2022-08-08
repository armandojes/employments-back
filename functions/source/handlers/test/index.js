import sendEmail from '../../actions/sendEmail'

const test = async (request, response) => {
  try {
    await sendEmail('armandodejesus678@gmail.com', 'email transporter testing', '')
  } catch (error) {
    response.send('an error acurred')
  }
  response.send('mission succeded')
}

export default test
