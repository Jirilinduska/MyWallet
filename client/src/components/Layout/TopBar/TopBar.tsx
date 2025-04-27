import { useUserContext } from "../../../context/UserContext"
import { useUtilsContext } from "../../../context/UtilsContext"
import { IconClose, IconMenu } from "../../../utils/icons/icons"
import { useCompleteProfile } from "../../../hooks/useCompleteProfile"
import CreateNewBtn from "../../UI/CreateNewBtn/CreateNewBtn"
import { useEffect, useState } from "react"
import { useRefetchContext } from "../../../context/RefetchContext"
import { CATEGORY_ID_INCOME, CATEGORY_ID_TRANSACTION } from "../../../config/globals"
import { handleGetLastTransactions } from "../../../API/Transactions"
import { ITodayData } from "../../../utils/interfaces/interfaces"
import LastTransaction from "../../UI/LastTransaction/LastTransaction"

const TopBar = () => {

    const { overviewDataKey } = useRefetchContext()
    const { showNav, toggleNav } = useUtilsContext()
    const [data, setData] = useState<ITodayData | null>(null)

    useCompleteProfile()

    useEffect(() => {
        const fetchData = async() => {
            const response = await handleGetLastTransactions()
            setData(response)
        }
        fetchData()
    }, [overviewDataKey])

  return (
    <div className="animate-fadeInDown py-4 px-4 mb-10 flex items-center gap-10 fixed top-0 left-0 lg:left-[250px] w-full lg:w-[calc(100%-250px)] bg-white z-10 shadow-lg">

        {/* Poslední transakce */}
        <div className="flex-1">

            <div className="hidden xl:flex gap-6 items-center">
                { data?.lastExpense && (
                    <LastTransaction
                        iconID={data.lastExpenseCategory.iconID}
                        name={data.lastExpenseCategory.name}
                        date={data.lastExpense.createdAt}
                        amount={data.lastExpense.amount}
                        type={CATEGORY_ID_TRANSACTION}
                        fullWidth={false}
                    />
                )}

                { data?.lastIncome && (
                    <LastTransaction
                        iconID={data.lastIncomeCategory.iconID}
                        name={data.lastIncomeCategory.name}
                        date={data.lastIncome.createdAt}
                        amount={data.lastIncome.amount}
                        type={CATEGORY_ID_INCOME}
                        fullWidth={false}
                    />
                )}
            </div>

            {!data?.lastExpense && !data?.lastIncome && <div className="flex-1" />}
        </div>

        <CreateNewBtn/>

        <div onClick={toggleNav} className="lg:hidden cursor-pointer">
            { showNav ? <IconClose className="icon"/> : <IconMenu className="icon"/> }
        </div>

</div>
  )
}

export default TopBar