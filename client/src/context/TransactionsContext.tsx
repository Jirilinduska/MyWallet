import { createContext, useCallback, useContext, useState } from "react"
import { handleDeleteTransaction, handleGetTransactions } from "../API/Transactions"
import { IGraphBreakdownData, ITransaction } from "../utils/interfaces/interfaces"
import { handleGetIncomes } from "../API/Income"
import { handleNotification } from "../utils/functions/notificationsUtils"
import { NOTIF_ERROR, NOTIF_SUCCESS, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../config/globals"

//TODO
interface TransContextProps {
    transactionIncome : ITransaction[]
    transactionExpense: ITransaction[]
    loading: boolean
    graphData: IGraphBreakdownData[]
    totalPrice: number
    fetchExpenseData: (month: number, year: number) => void
    fetchIncomeData: (month: number, year: number) => void
    date: { month: number, year: number }
    setDate: React.Dispatch<React.SetStateAction<{ month: number, year: number }>>
    deleteTransaction: (transID: string, langID: string, type: string) => void
    handlePrevMonth: (pageID: string) => void
    handleNextMonth: (pageID: string) => void
}


export const TransactionsContext = createContext<TransContextProps | undefined>(undefined)

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [transactionIncome, setTransactionIncome] = useState<ITransaction[]>([])
    const [transactionExpense, setTransactionExpense] = useState<ITransaction[]>([])
    const [loading, setLoading] = useState(false)
    const [graphData, setGraphData] = useState<IGraphBreakdownData[]>([])
    const [totalPrice, setTotalPrice] = useState(0)
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
        setLoading(true)
        try {
            const response = await handleGetTransactions(month, year)
            console.log('Expense data:', response.data.transactions) 
            // const data = response.data.transactions
            setTransactionExpense(response.data.transactions)
            setGraphData(response.data.graphData)
            setTotalPrice(response.data.totalPrice)
        } catch (error) {
            handleNotification(NOTIF_ERROR, "", "Něco se pokazilo", "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [])

    // GET INCOME DATA
    const fetchIncomeData = useCallback(async (month: number, year: number) => {
        setLoading(true)
        try {
            const response = await handleGetIncomes(month, year)
            // console.log('Income data:', response.data)
            setTransactionIncome(response.data.transactions)
            setGraphData(response.data.graphData)
            setTotalPrice(response.data.totalPrice)
        } catch (error) {
            // TODO - Přidat langID
            handleNotification(NOTIF_ERROR, "", "Něco se pokazilo", "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [])

    // DELETE
    const deleteTransaction = useCallback(async(transID: string, langID: string, type: string) => {
        setLoading(true)
        try {
            await handleDeleteTransaction(transID)  
            handleNotification(NOTIF_SUCCESS, langID, "Transakce odstraněna", "Transaction deleted") 
            if (type === PAGE_ID_INCOME) {
                fetchExpenseData(date.month, date.year)
            } else if(type === PAGE_ID_TRANSACTIONS) {
                setTransactionExpense((prev) => prev.filter((item) => item._id !== transID))
            }   
        } catch (error) {
            handleNotification(NOTIF_ERROR, langID, "Něco se pokazilo", "Something went wrong")
        } finally {
            setLoading(false)
        }
    }, [date])

    // POST - CREATE NEW 
    const createTransaction = useCallback(async() => {

    }, [])

    return (
        <TransactionsContext.Provider value={
            { transactionExpense, transactionIncome, loading, graphData, handleNextMonth, handlePrevMonth,
                totalPrice, fetchExpenseData, fetchIncomeData, date, setDate, deleteTransaction 
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