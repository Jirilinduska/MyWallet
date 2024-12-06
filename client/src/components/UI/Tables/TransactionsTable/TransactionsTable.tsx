import { useState } from "react"
import TableHeader from "../TableHeader/TableHeader"
import TableHeaderSortable from "../TableHeaderSortable/TableHeaderSortable"
import TableRow from "../TableRow/TableRow"
import EditTransModal from "../../Modals/EditTransModal/EditTransModal"


// TODO - Upravit classy - smazat nepotřebne

const TransactionsTable = () => {

    const [showEditModal, setShowEditModal] = useState(false)

    const toggleEditModal = () => setShowEditModal(!showEditModal)

    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">

        { showEditModal && <EditTransModal toggleEditModal={toggleEditModal}/> }

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

                {/* // TODO x.map() na všechny získane transakce. */}
                
                {/* První řádek */}
                <TableRow
                    categoryValue="Laptop"
                    dateValue="01.12.2024"
                    priceValue={1000}
                    titleValue="Apple MacBook Pro 17"
                    toggleEditModal={toggleEditModal}
                />

                {/* Druhý řádek */}
                <TableRow
                    categoryValue="Food"
                    dateValue="02.12.2024"
                    priceValue={2000}
                    titleValue=""
                    toggleEditModal={toggleEditModal}
                />

          </tbody>
        </table>
      </div>
    )
  }

export default TransactionsTable