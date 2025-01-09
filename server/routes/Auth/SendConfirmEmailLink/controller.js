const { sendEmailAfterRegistration } = require("../../../modules/Emails/Emails")

const sendConfirmEmailLink = async(req,res) => {

    const { token } = req.body  
    const email = req.user.email

    try {
        await sendEmailAfterRegistration(email, token)

        return res.status(200).json({ errCode: 5001 })
    } catch (error) {
        console.log("sendConfirmEmailLink() => : ", error)
        return res.status(500).json({ errCode: 5000 })
    }
}

module.exports = { sendConfirmEmailLink }