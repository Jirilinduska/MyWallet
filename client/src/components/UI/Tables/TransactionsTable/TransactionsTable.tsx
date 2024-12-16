import TableHeader from "../TableHeader/TableHeader"
import TableHeaderSortable from "../TableHeaderSortable/TableHeaderSortable"
import TableRow from "../TableRow/TableRow"
import { ITransaction } from "../../../../utils/interfaces/interfaces"
import { useUserContext } from "../../../../context/UserContext"
import { CSSProperties, useEffect, useState } from "react"
import { LANG_CZECH } from "../../../../config/globals"
import "animate.css"
import { BarLoader } from "react-spinners"
import { formatLang } from "../../../../utils/functions/formatLang"

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

    // TODO Dokončit sorttovani
    const handleSort = () => {}

    useEffect(() => {
      if(!userLangID) refreshUserData()
    }, [])

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
              
                { data.map( (x) => (
                    <TableRow
                      key={x._id}
                      categoryValue={x.category}
                      dateValue={`${x.day}.${x.month}.${x.year}`}
                      priceValue={x.amount}
                      titleValue={x.title}
                      toggleEditModal={x.onEdit}
                      userLangID={userLangID}
                      userCurrency={userCurrency}
                    />
                ))}
                
          </tbody>
        </table>
      </div>
    )
  }

export default TransactionsTable