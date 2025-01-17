const Notification = require("../../models/Notification")

const NOTIF_TYPE_REGISTRATION = "Registration"

const msgCS_1 = "Děkujeme, že jste si vybrali My Wallet App jako svého průvodce ve světě financí! 🎉"
const msgCS_2 = "Začněte svou cestu tím, že si přidáte své první kategorie výdajů, nastavíte měsíční rozpočet a sledujete své finance efektivněji než kdy dříve."
const msgCS_3 = "Hodně štěstí při správě vašich financí! 💪"

const msgEN_1 = "Thank you for choosing My Wallet App as your guide in the world of finance! 🎉"
const msgEN_2 = "Start your journey by adding your first expense categories, setting up a monthly budget, and tracking your finances more efficiently than ever before."
const msgEN_3 = "Wishing you the best of luck in managing your finances! 💪"

const notifAfterRegister = async(userID) => {

    try {
        
        await Notification.create({
            userID: userID,
            type: NOTIF_TYPE_REGISTRATION,
            titleCS: "Vítejte v My Wallet App!",
            titleEN: "Welcome to My Wallet App!",
            messageCS: [msgCS_1, msgCS_2, msgCS_3],
            messageEN: [msgEN_1, msgEN_2, msgEN_3]
        })

    } catch (error) {
        console.log("notifAfterRegister() => : ", error)
    }

}

module.exports = { notifAfterRegister }