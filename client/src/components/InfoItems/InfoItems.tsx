import { COLOR_BLUE, COLOR_GREEN, COLOR_WHITE, SIZE_ROW } from "../../config/globals"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import { IconExpense, IconIncome, IconMoneyInHand } from "../../utils/icons/icons"
import InfoItem from "../UI/InfoItem/InfoItem"

interface InfoItemsProps {
    expense: number
    income: number
    budget: number
}

const InfoItems = ({ budget, expense, income } : InfoItemsProps ) => {

    const { userLangID } = useUserContext()

  return (
    <div className="w-full mb-10 xl:mb-0 xl:w-1/3">

      <InfoItem
        amount={expense}
        desc={formatLang(userLangID, "Výdaje", "Expense")}
        icon={<IconExpense />}
        plannedAmount={budget}
        color={COLOR_WHITE}
        size={SIZE_ROW}
        formatToCurrency={true}
      />

      <InfoItem
        amount={income}
        desc={formatLang(userLangID, "Příjmy", "Income")}
        icon={<IconIncome />}
        plannedAmount={null}
        color={COLOR_GREEN}
        size={SIZE_ROW}
        formatToCurrency={true}
      />

      <InfoItem
        amount={income - expense}
        desc={formatLang(userLangID, "Ušetřeno", "Saved")}
        icon={<IconMoneyInHand />}
        plannedAmount={null}
        color={COLOR_BLUE}
        size={SIZE_ROW}
        formatToCurrency={true}
      />

    </div>
  )
}

export default InfoItems
