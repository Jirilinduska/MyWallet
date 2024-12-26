import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { handleDeleteTransaction, handleGetTransactions, handleGetTransactionsByCategory, handleUpdateTransaction } from "../API/Transactions"
import { ITransaction, IcategoriesYearOverview } from "../utils/interfaces/interfaces"
import { handleGetIncomes } from "../API/Income"
import { handleNotification } from "../utils/functions/notificationsUtils"
import { NOTIF_ERROR, NOTIF_SUCCESS, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../config/globals"

interface TransContextProps {
    transactionIncome : ITransaction[]
    transactionExpense: ITransaction[]
    graphDataInc: IcategoriesYearOverview[]
    graphDataExp: IcategoriesYearOverview[]
    totalPriceInc: number
    totalPriceExp: number
    fetchExpenseData: (month: number, year: number) => void
    fetchIncomeData: (month: number, year: number) => void
    date: { month: number, year: number }
    setDate: React.Dispatch<React.SetStateAction<{ month: number, year: number }>>
    deleteTransaction: (transID: string, langID: string, type: string) => void
    handlePrevMonth: (pageID: string) => void
    handleNextMonth: (pageID: string) => void
    getTransactionByCat: (catID: string) => void
    transactionsByCategory: ITransaction[]
}

export const TransactionsContext = createContext<TransContextProps | undefined>(undefined)

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [transactionIncome, setTransactionIncome] = useState<ITransaction[]>([])
    const [transactionExpense, setTransactionExpense] = useState<ITransaction[]>([])
    const [transactionsByCategory, setTransactionsByCategory] = useState<ITransaction[]>([])
    const [graphDataInc, setGraphDataInc] = useState<IcategoriesYearOverview[]>([])
    const [graphDataExp, setGraphDataExp] = useState<IcategoriesYearOverview[]>([])
    const [totalPriceInc, setTotalPriceInc] = useState(0)
    const [totalPriceExp, setTotalPriceExp] = useState(0)
    const [date, setDate] = useState({ month: new Date().getMonth() + 1, year: new Date().getFullYear() })
    

    const handlePrevMonth = (pageID: string) => {
        setDate((prev) => {
            const newMonth = prev.month - 1
            const newDate = newMonth < 1
                ? { month: 12, year: prev.year - 1 }
                : { month: newMonth, year: prev.year }
            if(pageID === PAGE_ID_INCOME) {
                fetchIncomeData(newDate.month, newDate.year)
            } else if (pageID === PAGE_ID_TRANSACTIONS) {
                fetchExpenseData(newDate.month, newDate.year)
            }
            return newDate
        })
    }

    const handleNextMonth = (pageID: string) => {
        setDate((prev) => {
            const newMonth = prev.month + 1
            const newDate = newMonth > 12
                ? { month: 1, year: prev.year + 1 }
                : { month: newMonth, year: prev.year }
            if(pageID === PAGE_ID_INCOME) {
                fetchIncomeData(newDate.month, newDate.year)
            } else if (pageID === PAGE_ID_TRANSACTIONS) {
                fetchExpenseData(newDate.month, newDate.year)
            }
            return newDate
        })
    }

    // GET EXPENSE DATA
    const fetchExpenseData = useCallback( async(month: number, year: number) => {
        try {
            const response = await handleGetTransactions(month, year)
            setTransactionExpense(response.data.transactions)
            setGraphDataExp(response.data.graphData)
            setTotalPriceExp(response.data.totalPrice)
        } catch (error) {
            console.log("fetchExpenseData() => : ", error)
        }
    }, [] )

    // GET INCOME DATA
    const fetchIncomeData = useCallback(async (month: number, year: number) => {
        try {
            const response = await handleGetIncomes(month, year)
            setTransactionIncome(response.data.transactions)
            setGraphDataInc(response.data.graphData)
            setTotalPriceInc(response.data.totalPrice)
        } catch (error) {
            console.log("fetchIncomeData() => : ", error)
        }
    }, [] )

    // DELETE
    const deleteTransaction = useCallback(async(transID: string, langID: string, type: string) => {
        try {
            await handleDeleteTransaction(transID) 
            
            setTransactionsByCategory((prev) => prev.filter((trans) => trans._id !== transID))

            if (type === PAGE_ID_INCOME) {
                setTransactionIncome((prev) => prev.filter((trans) => trans._id !== transID))
            } else if(type === PAGE_ID_TRANSACTIONS) {
                setTransactionExpense((prev) => prev.filter((trans) => trans._id !== transID))
            }  
            handleNotification(NOTIF_SUCCESS, langID, "Transakce odstraněna", "Transaction deleted")  
        } catch (error) {
            handleNotification(NOTIF_ERROR, langID, "Něco se pokazilo", "Something went wrong")
        }
    }, [date])

    // POST - CREATE NEW 
    const createTransaction = useCallback(async() => {

    }, [])
    
    // GET TRANS BY CATEGORY
    const getTransactionByCat = useCallback(async(catID: string) => {
        try {
            const response = await handleGetTransactionsByCategory(catID)
            console.log("getTransactionByCat() => : response: ", response)
            setTransactionsByCategory(response.data)
        } catch (error) {   
            console.log("getTransactionByCat() => : ", error)
        }
    }, [] )


    useEffect(() => {
        fetchExpenseData(date.month, date.year)
        fetchIncomeData(date.month, date.year)
    }, [] )

    return (
        <TransactionsContext.Provider value={
            { transactionExpense, transactionIncome, graphDataExp, graphDataInc, handleNextMonth, handlePrevMonth,
                totalPriceExp, totalPriceInc, fetchExpenseData, fetchIncomeData, date, setDate, deleteTransaction, getTransactionByCat,
                transactionsByCategory,
            }}
        >
            { children }
        </TransactionsContext.Provider>
    )
}

export const useTransactionsContext = () => {
    const context = useContext(TransactionsContext)
    if (!context) {
        throw new Error("TransactionsContext must be used within a CategoriesProvider")
    }
    return context
}