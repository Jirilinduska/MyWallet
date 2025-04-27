const Budget = require("../../models/Budget")
const MonthSummary = require("../../models/MonthSummary")
const Notification = require("../../models/Notification")
const User = require("../../models/User")
const { createMonthlySummary } = require("../MonthSummary/MonthlySummary")

const NOTIF_TYPE_REGISTRATION = "MonthlySummary"

const msgCS_1 = "Podívejte se, jak se vám minulý měsíc dařilo spravovat své finance. Prohlédněte si své výdaje, porovnejte je s plánovaným rozpočtem a zjistěte, kde můžete ušetřit. 🎯"
const msgEN_1 = "Take a look at how you managed your finances last month. Review your expenses, compare them to your planned budget, and discover where you can save. 🎯"

const notifMonthSummary = async (user_id) => {
    const now = new Date();
    let lastMonth = now.getMonth();
    let year = now.getFullYear();
  
    if (lastMonth === 0) {
      lastMonth = 12;
      year = year - 1;
    }
  
    try {
      const user = await User.findById(user_id);
      const lastSummary = user.lastMonthSummaryNotif;
  
      // Pokud je poslední notifikace za aktuální měsíc, nic neděláme
      if (lastSummary.month === lastMonth && lastSummary.year === year) {
        return;
      }
  
      // Vytvoření notifikace pro všechny měsíce mezi poslední notifikací a aktuálním měsícem
      let currentMonth = lastSummary.month;
      let currentYear = lastSummary.year;
  
      // Pokud je aktuální měsíc za posledním měsícem (například 4/2025 za 12/2024), pošleme notifikace za všechny mezi
      while (currentYear < year || (currentYear === year && currentMonth <= lastMonth)) {
        let monthSummary = await MonthSummary.findOne({
          createdBy: user._id,
          year: currentYear,
          month: currentMonth,
        });
  
        if (!monthSummary) {
          await createMonthlySummary(user_id, currentMonth, currentYear);
          monthSummary = await MonthSummary.findOne({
            createdBy: user._id,
            year: currentYear,
            month: currentMonth,
          });
        }
  
        const budget = await Budget.findOne({
          createdBy: user._id,
          month: currentMonth,
          year: currentYear,
        });
  
        const totalSpent = monthSummary.totalExpense;
        const totalIncome = monthSummary.totalIncome;
        const totalPlanned = budget
          ? budget.budgetCategories.reduce((a, b) => a + b.price, 0)
          : 0;
  
        // Pošleme notifikaci pro daný měsíc
        await Notification.create({
          userID: user_id,
          type: NOTIF_TYPE_REGISTRATION,
          titleCS: `Vaše měsíční shrnutí je tady! (${currentMonth}/${currentYear})`,
          titleEN: `Your monthly summary is here! (${currentMonth}/${currentYear})`,
          messageCS: [msgCS_1],
          messageEN: [msgEN_1],
          totalSpent,
          totalPlanned,
          totalIncome,
          month: currentMonth,
          year: currentYear,
        });
  
        // Připravíme se na další měsíc
        currentMonth++;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
        }
      }
  
      // Aktualizujeme uživatelovu poslední notifikaci
      user.lastMonthSummaryNotif = { month: lastMonth, year }
      await user.save();
    } catch (error) {
      console.log("notifMonthSummary() => : ", error);
    }
  }
  


module.exports = { notifMonthSummary }