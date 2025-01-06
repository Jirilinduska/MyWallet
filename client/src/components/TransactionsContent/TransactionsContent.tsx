import { useState } from "react"
import { useTransactionsContext } from "../../context/TransactionsContext"
import { useUserContext } from "../../context/UserContext"
import { getMonthName } from "../../utils/functions/dateUtils"
import { formatLang } from "../../utils/functions/formatLang"
import { ITransaction } from "../../utils/interfaces/interfaces"
import TableTransactions from "../../better_components/UI/TableTransactions/TableTransactions"
import { COLOR_BLUE, PAGE_ID_TRANSACTIONS } from "../../config/globals"
import { formatCurrency } from "../../utils/functions/formatNumber"
import BarChartCategories from "../../better_components/Charts/BarChartCategories/BarChartCategories"
import Button from "../../better_components/UI/Button/Button"

interface TransactionsContentProps {
    transactions: ITransaction[]
    toggleNewTransModal: () => void
    pageID: string
    setSelectedTransaction: (transaction: ITransaction) => void
    toggleEditModal: () => void
}


const TransactionsContent = ({ transactions, toggleNewTransModal, pageID, setSelectedTransaction, toggleEditModal } : TransactionsContentProps ) => {

    const { date, totalPriceExp, totalPriceInc, graphDataExp, graphDataInc } = useTransactionsContext()
    const { userLangID, userCurrency } = useUserContext()

    const [wantTable, setWantTable] = useState(true)
    const [wantStats, setWantStats] = useState(false)

    // Pokud nejsou žádné transakce pro daný měsíc.
    if(transactions.length === 0) {
        return (
            <div className="flex flex-col gap-10 items-center justify-center mt-20">

                <p className="h-full">
                    {formatLang(userLangID, 
                        `Žádné transakce pro ${getMonthName(date.year, date.month, userLangID)} ${date.year}`,
                        `No transactions for ${getMonthName(date.year, date.month, userLangID)} ${date.year}`,
                    )}
                </p>

                <button className="button-blue" onClick={toggleNewTransModal}>{formatLang(userLangID, "Přidat transakci", "Add transaction")}</button>
            </div>
        )
    }

  return (
    <div>

        <div className="flex items-center justify-between">

            {/* Navigator */}
            <div className="flex flex-col justify-center gap-6 text-xs sm:flex-row sm:text-sm">
                <div className="">

                    <button className={`${wantTable ? "font-semibold text-black" : "font-light text-gray-500"}`} onClick={ () => {
                        setWantStats(false)
                        setWantTable(true)
                    }}>Všechny výdaje</button>

                    <div className={`${wantTable ? "bg-black" : "bg-colorGrayHover"} w-full h-[2px] mt-1`}></div>

                </div>
                <div className="">

                    <button className={`${wantStats ? "font-semibold text-black" : "font-light text-gray-500"}`} onClick={ () => {
                        setWantStats(true)
                        setWantTable(false)
                    }}>Graf kategorií</button>

                    <div className={`${wantStats ? "bg-black" : "bg-colorGrayHover"} w-full h-[2px] mt-1`}></div>

                </div>
            </div>

            <div className="w-1/2 sm:w-[200px]">
                <Button 
                    color={COLOR_BLUE}
                    loading={false}
                    value={formatLang(userLangID, pageID === PAGE_ID_TRANSACTIONS ? "Nová transakce" : "Nový příjem", pageID === PAGE_ID_TRANSACTIONS ? "New transaction" : "New income")}
                    handleClick={toggleNewTransModal}
                />
            </div>


        </div>

        {/* // Total price */}
        <div className="flex items-center gap-2 font-semibold my-6">
            <span className="">{formatLang(userLangID, "Celkem: ", "Total: ")}</span>
            <span className="">{pageID === PAGE_ID_TRANSACTIONS ? formatCurrency(totalPriceExp, userCurrency) : formatCurrency(totalPriceInc, userCurrency)}</span>
        </div>


        { wantTable && (
            <TableTransactions 
                data={transactions} 
                transType={pageID}
                setSelectedTransaction={setSelectedTransaction}
                toggleEditModal={toggleEditModal}
            />
        )}

        { wantStats && (
            <div className="h-[400px]">
                <BarChartCategories chartData={ pageID === PAGE_ID_TRANSACTIONS ? graphDataExp : graphDataInc }/>
            </div>
        )}

    </div>
  )
}

export default TransactionsContent