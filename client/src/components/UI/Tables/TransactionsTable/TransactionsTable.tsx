import { useState } from "react"
import TableHeader from "../TableHeader/TableHeader"
import TableHeaderSortable from "../TableHeaderSortable/TableHeaderSortable"
import TableRow from "../TableRow/TableRow"
import EditTransModal from "../../Modals/EditTransModal/EditTransModal"
import { ITransactionsTable } from "../../../../utils/interfaces/interfaces"


// TODO - Upravit classy - smazat nepotřebne

const TransactionsTable: React.FC<ITransactionsTable> = ({ data }) => {


    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">


        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            {/* Table header */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr>
                    <TableHeaderSortable value="Date"/>

                    <TableHeader value="Title"/>

                    <TableHeaderSortable value="Category"/>

                    <TableHeaderSortable value="Amount"/>

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