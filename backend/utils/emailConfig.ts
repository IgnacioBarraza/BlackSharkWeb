import { createTransport } from 'nodemailer'
import { EMAIL, PASS } from './config'

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASS
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