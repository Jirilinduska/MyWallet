import { useState } from "react"
import { useUserContext } from "../../../context/UserContext"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { formatLang } from "../../../utils/functions/formatLang"
import { ITransaction, IcategoriesYearOverview } from "../../../utils/interfaces/interfaces"
import { PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { Box, Button } from "@mui/material"
import TableTransactionsMUI from "../../UI/TableTransactions/TableTransactionsMUI"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { BarChart } from "@mui/x-charts"

interface TransactionsContentProps {
    transactions: ITransaction[]
    toggleNewTransModal: () => void
    pageID: string
    setSelectedTransaction: (transaction: ITransaction) => void
    toggleEditModal: () => void
    totalPrice: number
    year: number
    month: number
    graphData: IcategoriesYearOverview[]
}


const TransactionsContent = ({ transactions, toggleNewTransModal, pageID, setSelectedTransaction, toggleEditModal, totalPrice, year, month, graphData } : TransactionsContentProps ) => {

    const { userLangID, userCurrency } = useUserContext()
    const { categoriesIncome, categoriesTransactions } = useCategoriesContext()

    const [wantTable, setWantTable] = useState(true)
    const [wantStats, setWantStats] = useState(false)

    const dataSet = graphData.map(item => {

        let categoryName
        if(pageID === PAGE_ID_TRANSACTIONS) {
            categoryName = categoriesTransactions.find(x => x._id === item.categoryID)?.name || formatLang(userLangID, "Neznámá kategorie", "Unknown category")
        } else {
            categoryName = categoriesIncome.find(x => x._id === item.categoryID)?.name || formatLang(userLangID, "Neznámá kategorie", "Unknown category")
        }
        return {
            label: categoryName,
            value: item.total
        };
    })

    // Pokud nejsou žádné transakce pro daný měsíc.
    if(transactions.length === 0) {
        return (
            <div className="flex flex-col gap-10 items-center justify-center mt-20">

                <p className="h-full">
                    {formatLang(userLangID, 
                        `Žádné transakce pro ${getMonthName(year, month, userLangID)} ${year}`,
                        `No transactions for ${getMonthName(year, month, userLangID)} ${year}`,
                    )}
                </p>

                <Button
                    variant="contained"
                    onClick={toggleNewTransModal}
                >
                    {formatLang(userLangID, "Přidat transakci", "Add transaction")}
                </Button>
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
                    }}>{formatLang(userLangID, "Transakce", "Transactions")}</button>

                    <div className={`${wantTable ? "bg-black" : "bg-colorGrayHover"} w-full h-[2px] mt-1`}></div>

                </div>
                <div className="">

                    <button className={`${wantStats ? "font-semibold text-black" : "font-light text-gray-500"}`} onClick={ () => {
                        setWantStats(true)
                        setWantTable(false)
                    }}>{formatLang(userLangID, "Graf", "Chart")}</button>

                    <div className={`${wantStats ? "bg-black" : "bg-colorGrayHover"} w-full h-[2px] mt-1`}></div>

                </div>
            </div>

            <div className="w-1/2 sm:w-[200px]">
                <Button 
                    variant="contained"
                    onClick={toggleNewTransModal}
                >
                    {formatLang(userLangID, pageID === PAGE_ID_TRANSACTIONS ? "Nový výdaj" : "Nový příjem", pageID === PAGE_ID_TRANSACTIONS ? "New expense" : "New income")}
                </Button>
            </div>


        </div>

        {/* // Total price */}
        <div className="flex items-center gap-2 font-semibold my-6">
            <span className="">{formatLang(userLangID, "Celkem: ", "Total: ")}</span>
            <span>{formatCurrency(totalPrice, userCurrency)}</span>
        </div>


        { wantTable && (
            <TableTransactionsMUI
                data={transactions} 
                transType={pageID}
                setSelectedTransaction={setSelectedTransaction}
                toggleEditModal={toggleEditModal}
            />
        )}

        { wantStats && (
            <Box>
                <BarChart
                    dataset={dataSet}
                    yAxis={[{ scaleType: 'band', dataKey: 'label' }]} 
                    series={[{ dataKey: 'value', color: '#5A4BAD' }]}
                    layout="horizontal"
                    height={500} 
                    grid={{ vertical: true, horizontal: true }}
                    sx={{ width: "95% !important", overflow: "visible !important" }}
                />
            </Box>
        )}

    </div>
  )
}

export default TransactionsContent