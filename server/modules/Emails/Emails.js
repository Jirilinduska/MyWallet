const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})


// Confirm registration
const sendEmailAfterRegistration = async(emailAdressTo, token) => {

    try {
        const emailConfirmationUrl = `${process.env.API_URL}/api/email/confirm-email?token=${token}`

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailAdressTo,
            subject: "Please confirm your email adress.",
            text: "Click the link below to confirm your email address.",
            html: `<p>Click the <a href='${emailConfirmationUrl}'>link</a> to confirm your email address.</p>`
        })

    } catch (error) {
        console.log("sendEmailAfterRegistration() => : ", error)
    }
}

// Forgotten email
const sendEmailForgottenPassword = async(emailAdressTo, token) => {

    const resetUrl = `${process.env.API_URL}/api/auth/verify-reset-token/${token}`

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: emailAdressTo,
            subject: "Reset password",
            text: "Click the link below to confirm your email address.",
            html: `<p>Click the <a href='${resetUrl}'>link</a> to reset your password</p>`
        })
    } catch (error) {
        console.log("sendEmailForgottenPassword() => : ", error)
    }
}

module.exports = { sendEmailAfterRegistration, sendEmailForgottenPassword }