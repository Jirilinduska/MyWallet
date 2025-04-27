import { Avatar, Box, Card, Divider, IconButton, Skeleton, Tooltip, Typography } from "@mui/material"
import InfoItemMUI from "../../UI/InfoItem/InfoItemMUI"
import { IconCard } from "../../../utils/icons/icons"
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { getMonthName } from "../../../utils/functions/dateUtils"
import { useEffect, useState } from "react"
import { handleGetPrevMonth } from "../../../API/Transactions"
import { CategorySummary, IMonthlySummary } from "../../../utils/interfaces/interfaces"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { categoryIcons } from "../../../utils/icons/category-icons"
import { formatCurrency } from "../../../utils/functions/formatNumber"
import { format } from 'date-fns'
import { BarChart } from "@mui/x-charts"
import { useNavigate } from "react-router-dom"

interface PreviusMonthProps {
    isExpense: boolean
    year: number,
    month: number
    loading: boolean
    toggleLoading: () => void
}

const PreviusMonth = ({ isExpense, year, month, loading, toggleLoading }: PreviusMonthProps) => {

    const { userLangID, userCurrency } = useUserContext()
    const { categoriesIncome, categoriesTransactions } = useCategoriesContext()
    const navigate = useNavigate()

    const [monthData, setMonthData] = useState<IMonthlySummary | null>(null)

    const renderCategoryItems = (categoryRecords: CategorySummary[], isExpense: boolean) => {
        if (!categoryRecords || categoryRecords.length === 0) {
            return <Typography variant="h6" color="text.secondary">
                {formatLang(
                    userLangID,
                    isExpense ? `Žádné výdaje pro měsíc ${getMonthName(year, month, userLangID)} ${year}` :  
                    `Žádné příjmy pro měsíc ${getMonthName(year, month, userLangID)} ${year}`,  
                    isExpense ? `No expense for month ${getMonthName(year, month, userLangID)} ${year}` :  
                    `No income for month ${getMonthName(year, month, userLangID)} ${year}`
                )}
            </Typography>
        }
    
        const sortedEntries = categoryRecords.sort((a, b) => b.total - a.total)
    
        return sortedEntries.map((categoryData) => {

            const categoryName = 
                isExpense 
                    ? categoriesTransactions.find(x => x._id === categoryData.categoryID)?.name
                    : categoriesIncome.find(x => x._id === categoryData.categoryID)?.name
    
            const categoryIconID = 
                isExpense 
                    ? categoriesTransactions.find(x => x._id === categoryData.categoryID)?.iconID
                    : categoriesIncome.find(x => x._id === categoryData.categoryID)?.iconID
    
            const categoryIcon = categoryIcons.find(x => x.id === categoryIconID)?.iconJSX
    
            const totalAmount = categoryData.total
            const transactionCount = categoryData.count
            const maxTransaction = categoryData.maxTransaction
    
            const dataSet = [
                { label: formatLang(userLangID, "PLÁN", "BUDGET"), value: categoryData.planned },
                { label: formatLang(userLangID, "SKUTEČNOST", "ACTUAL"), value: totalAmount },
            ]
    
            return (
                <Card variant="outlined" sx={{ mb: 2, p: 2 }} key={categoryData.categoryID}>
                    <Box display="flex" justifyContent="space-between" alignItems={{ md: "center" }} mb={2} flexDirection={{ xs: "column", md: "row" }}>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Tooltip title={categoryName}>
                                <IconButton onClick={() => navigate(`/dashboard/categories/preview-category/${categoryData.categoryID}`)}>     
                                    <Avatar>{loading ? <Skeleton variant="circular"/> : categoryIcon}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Box>
                                <Typography fontSize={{ xs: 14, md: 16 }} fontWeight={600}>{loading ? <Skeleton variant="text" width={100}/> : categoryName}</Typography>
                                <Typography fontSize={{ xs: 14, md: 16 }} color={isExpense ? "error" : "success"} fontWeight={600}>
                                    { loading
                                    ? <Skeleton variant="text" width={200}/>
                                    : formatLang(
                                        userLangID, 
                                        `Celkem: ${isExpense ? "-" : ""}${formatCurrency(totalAmount, userCurrency)}`, 
                                        `Total: ${isExpense ? "-" : ""}${formatCurrency(totalAmount, userCurrency)}`)
                                    }
                                </Typography>
                            </Box>
                        </Box>
                        <Typography color="text.secondary" fontSize={14} mt={{ xs: 1, md: 0 }}>
                            {loading ? <Skeleton variant="text" width={100}/> : formatLang(userLangID, `Počet transakcí: ${transactionCount}`, `Number of transactions: ${transactionCount}`)}
                        </Typography>
                    </Box>
    
                    <Divider sx={{ mb: 1 }} />
    
                    <Box>
                        <Typography fontWeight={600} gutterBottom fontSize={{ xs: 14, md: 16 }}>
                            {loading ? <Skeleton variant="text" width={200}/> : formatLang(userLangID, `Největší transakce`, `Largest transaction`)}
                        </Typography>
                        <Typography color="text.secondary">{loading ? <Skeleton variant="text" width={100}/> : format(new Date(maxTransaction?.createdAt ?? new Date()), 'dd.MM.yyyy')}</Typography>
                        {maxTransaction?.title.trim() !== "" && (
                            <Typography fontStyle="italic" mt={0.5}>"{maxTransaction?.title}"</Typography>
                        )}
                        <Typography fontWeight={500} mt={0.5}>
                            {loading ? <Skeleton variant="text" width={100}/> : formatCurrency(maxTransaction?.amount ?? 0, userCurrency)}
                        </Typography>
                    </Box>
    
                    {isExpense && (
                        <>
                            <Typography 
                                textAlign="center" 
                                fontWeight={600} 
                                fontSize={14}
                            >
                                {!loading && formatLang(userLangID, "Plán vs Skutečnost", "Budget vs Actual")}
                            </Typography>
    
                            <Box sx={{ width: '100%', height: 'auto' }}>
                                { loading
                                ? <Skeleton variant="rectangular" width="100%" height={250}/>
                                : <BarChart
                                    dataset={dataSet}
                                    yAxis={[{ scaleType: 'band', dataKey: 'label' }]} 
                                    series={[{ dataKey: 'value', color: '#5A4BAD' }]}
                                    layout="horizontal"
                                    grid={{ vertical: true }}
                                    height={200}
                                    sx={{ width: { xs: "70% !important", sm: "80% !important" }, overflow: "visible !important" }}
                                 />
                                }
                            </Box>
                        </>
                    )}
                </Card>
            )
        })
    }
    

    useEffect(() => {
        const fetchData = async () => {
            if(month === new Date().getMonth() + 1 && year === new Date().getFullYear()) {
                return
            }
            toggleLoading()
            const response = await handleGetPrevMonth(month, year)
            setMonthData(response)
            toggleLoading()
        }
        fetchData()
    }, [month, year])

    if (!monthData) return <Typography variant="h6">Načítání dat...</Typography>

    return (
        <Box>
            <Box width={{ xs: "100%", md: "50%" }}>

                <InfoItemMUI
                    amount={isExpense ? monthData.totalExpense : monthData.totalIncome}
                    color={isExpense ? "error" : "success"}
                    formatToCurrency
                    isExpense={isExpense}
                    title={formatLang(
                        userLangID, 
                        isExpense 
                            ? `Celkové výdaje za měsíc ${getMonthName(year, month, userLangID)} ${year}` 
                            : `Celkové příjmy za měsíc ${getMonthName(year, month, userLangID)} ${year}`, 
                        isExpense 
                            ? `Total expenses for month ${getMonthName(year, month, userLangID)} ${year}` 
                            : `Total income for month ${getMonthName(year, month, userLangID)} ${year}`
                    )}
                    icon={<IconCard />}
                    loading={loading}
                />

                <Typography my={4} variant="h6" fontWeight={600}>
                    {formatLang(userLangID, 
                        isExpense ? "Výdaje podle kategorií" : "Příjmy podle kategorií", 
                        isExpense ? "Expenses by category" : "Income by category"
                    )}
                </Typography>

                <Box>
                    {renderCategoryItems(isExpense ? monthData.expenseByCategory : monthData.incomeByCategory, isExpense)}
                </Box>
            </Box>
        </Box>
    )
}

export default PreviusMonth
