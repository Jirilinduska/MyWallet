import TableHeader from "../TableHeader/TableHeader"
import TableHeaderSortable from "../TableHeaderSortable/TableHeaderSortable"
import TableRow from "../TableRow/TableRow"
import { ITransaction } from "../../../../utils/interfaces/interfaces"
import { useUserContext } from "../../../../context/UserContext"
import { CSSProperties, useEffect, useState } from "react"
import { LANG_CZECH, PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../../config/globals"
import "animate.css"
import { BarLoader } from "react-spinners"
import { formatLang } from "../../../../utils/functions/formatLang"
import { useCategoriesContext } from "../../../../context/CategoriesContext"
import { useParams } from "react-router-dom"
import { categoryIcons } from "../../../../utils/icons/category-icons"

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
}


// TODO - Upravit classy - smazat nepotřebne

interface TransactionsTableProps {
  data: (ITransaction & { onEdit: () => void })[]
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ data }) => {

    const { refreshUserData, userLangID, userCurrency } = useUserContext()
    const { categoriesTransactions, refreshCategories, categoriesIncome } = useCategoriesContext()

    const { pageID } = useParams()

    // TODO Dokončit sorttovani
    const handleSort = () => {}

    useEffect(() => {
      if(!userLangID) refreshUserData()
    }, [])

    useEffect(() => {
      refreshCategories()
    }, [categoriesTransactions, categoriesIncome] )

    return (
      <div className="animate-fadeIn relative overflow-x-auto shadow-md sm:rounded-lg my-10">

        {/* <BarLoader color="#1d4ed80" cssOverride={override} loading={loading}/> */}

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            {/* Table header */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr>
                    <TableHeaderSortable 
                      value={formatLang(userLangID, "Datum", "Date")}
                      handleSort={handleSort}
                    />

                    <TableHeader value={formatLang(userLangID, "Název", "Title")}/>

                    <TableHeaderSortable 
                      value={formatLang(userLangID, "Kategorie", "Category")}
                      handleSort={handleSort}
                    />

                    <TableHeaderSortable 
                      value={formatLang(userLangID, "Částka", "Amount")}
                      handleSort={handleSort}
                    />

                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only"></span>
                    </th>
                </tr>

            </thead>

            {/* Table body */}
            <tbody>

                { pageID === PAGE_ID_INCOME && data.map( (x) => {

                    const category = categoriesIncome.find( cat => cat._id === x.category )
                    const categoryName = category?.name || formatLang(userLangID, "Neznámá kategorie", "Unknown category")
                    const categoryIcon = categoryIcons.find( y => y.id === category?.iconID)?.iconJSX || null

                    return (
                      <TableRow
                        key={x._id}
                        categoryValue={categoryName}
                        dateValue={`${x.day}.${x.month}.${x.year}`}
                        priceValue={x.amount}
                        titleValue={x.title}
                        toggleEditModal={x.onEdit}
                        userLangID={userLangID}
                        userCurrency={userCurrency}
                        categoryIcon={categoryIcon}
                      />
                    )                    
                })}

                { pageID === PAGE_ID_TRANSACTIONS && data.map( (x) => {

                    const category = categoriesTransactions.find( cat => cat._id === x.category )
                    const categoryName = category?.name || formatLang(userLangID, "Neznámá kategorie", "Unknown category")
                    const categoryIcon = categoryIcons.find( y => y.id === category?.iconID)?.iconJSX || null

                    return (
                      <TableRow
                        key={x._id}
                        categoryValue={categoryName}
                        dateValue={`${x.day}.${x.month}.${x.year}`}
                        priceValue={x.amount}
                        titleValue={x.title}
                        toggleEditModal={x.onEdit}
                        userLangID={userLangID}
                        userCurrency={userCurrency}
                        categoryIcon={categoryIcon}
                      />
                    )                    
                })}
                
          </tbody>
        </table>
      </div>
    )
  }

export default TransactionsTable