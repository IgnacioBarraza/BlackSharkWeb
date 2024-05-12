import { createTransport } from 'nodemailer'
import { EMAIL, CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } from './config'

const transporter = createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN
    }
})

const sendMessage = async (to: string, text: string) => {
    try {
        await transporter.sendMail({
            from: 'bswebstudios@gmail.com',
            to: to,
            subject: 'Restablecimiento de contraseña Black Shark Web',
            text: text
        })
    } catch (error) {
        // console.log(error)
        return error
    }
}

export default sendMessage