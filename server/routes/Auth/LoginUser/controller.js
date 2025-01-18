const bcrypt = require('bcryptjs');
const User = require("../../../models/User");
const { generateToken } = require('../../../libs/jwtUtils');
const { monthSummary } = require('../../../modules/MonthSummary/MonthSummary');

const loginUser = async (req, res) => {
    
    const { email, password } = req.body;

    try {
        if (!email) return res.status(400).json({ errCode: 1007 })
        if (!password) return res.status(400).json({ errCode: 1003 })

        const findUser = await User.findOne({ email })

        if (!findUser) return res.status(400).json({ errCode: 1000 })

        const isMatch = await bcrypt.compare(password, findUser.password)

        if (!isMatch) return res.status(400).json({ errCode: 1001 })

        const token = generateToken(findUser._id, findUser.email)

        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        // Nastavení lastSummary na začátek aktuálního měsíce nebo předchozího měsíce
        let lastSummary = findUser.lastMonthSummary || new Date(currentYear, currentMonth - 1, 1)

        // Zajistíme, že porovnáváme na začátek měsíce
        lastSummary = new Date(lastSummary.getFullYear(), lastSummary.getMonth(), 1)

        // Pokud uživatel již má souhrn pro tento měsíc, nebudeme provádět zbytečnou aktualizaci
        if (lastSummary.getFullYear() !== currentYear || lastSummary.getMonth() !== currentMonth) {

            const tasks = []
            
            while (
                lastSummary.getFullYear() < currentYear ||
                (lastSummary.getFullYear() === currentYear && lastSummary.getMonth() < currentMonth)
            ) {
                const month = lastSummary.getMonth() + 1
                const year = lastSummary.getFullYear()
                tasks.push(monthSummary(findUser._id, year, month))

                // Posun na následující měsíc
                lastSummary = new Date(year, month, 1)
            }

            if (tasks.length > 0) {
                await Promise.all(tasks)
            }

            findUser.lastMonthSummary = new Date(currentYear, currentMonth, 1)

            await findUser.save()
        }

        return res.status(200).json({ token })
    } catch (error) {
        console.error("loginUser() => Error: ", error)
        return res.status(500).json({ errCode: 5000 })
    }
};

module.exports = { loginUser };
