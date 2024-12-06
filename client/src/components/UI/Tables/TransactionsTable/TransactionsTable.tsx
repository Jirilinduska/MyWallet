import TableHeader from "../TableHeader/TableHeader"
import TableHeaderSortable from "../TableHeaderSortable/TableHeaderSortable"
import TableRow from "../TableRow/TableRow"
import { ITransactionsTable } from "../../../../utils/interfaces/interfaces"
import { useUserContext } from "../../../../context/UserContext"
import { useEffect } from "react"
import { LANG_CZECH } from "../../../../config/globals"


// TODO - Upravit classy - smazat nepotřebne

const TransactionsTable: React.FC<ITransactionsTable> = ({ data }) => {

    const { refreshUserData, userLangID } = useUserContext()

    useEffect(() => {
      if(!userLangID) refreshUserData()
    }, [])

    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">


        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            {/* Table header */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr>
                    <TableHeaderSortable value={`${ userLangID === LANG_CZECH ? "Datum" : "Date" }`}/>

                    <TableHeader value={`${ userLangID === LANG_CZECH ? "Název" : "Title" }`}/>

                    <TableHeaderSortable value={`${ userLangID === LANG_CZECH ? "Kategorie" : "Category" }`}/>

                    <TableHeaderSortable value={`${ userLangID === LANG_CZECH ? "Částka" : "Amount" }`}/>

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
                    />
                ))}
                
          </tbody>
        </table>
      </div>
    )
  }

export default TransactionsTable