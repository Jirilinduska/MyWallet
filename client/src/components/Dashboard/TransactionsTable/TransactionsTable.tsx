import { IconSort } from "../../../utils/icons/icons"

{/* // TODO x.map() na všechny získane transakce. */}

const TransactionsTable = () => {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10">

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

            {/* Table header */}
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

                <tr>

                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                            Date
                            <a href="#" className="ms-1.5">
                                <IconSort className="w-3 h-3" />
                            </a>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3">
                        Title
                    </th>

                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                            Category
                            <a href="#" className="ms-1.5">
                                <IconSort className="w-3 h-3" />
                            </a>
                        </div>
                    </th>

                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                            Amount
                            <a href="#" className="ms-1.5">
                                <IconSort className="w-3 h-3" />
                            </a>
                        </div>
                    </th>


                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>

            {/* Table body */}

            <tbody>
                
                {/* První řádek */}
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    
                    <td className="px-6 py-4">01.12.2024</td>

                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
              
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">$2999</td>
                    
                    <td className="px-6 py-4 text-right">
                    
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Edit
                        </a>
                    </td>

                </tr>

                {/* Druhý řádek */}

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    
                    <td className="px-6 py-4">02.12.2024</td>

                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ""
                    </th>

                    <td className="px-6 py-4">Laptop PC</td>
                    <td className="px-6 py-4">$1999</td>
                    
                    <td className="px-6 py-4 text-right">
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            Edit
                        </a>
                    </td>
                </tr>

          </tbody>
        </table>
      </div>
    )
  }

export default TransactionsTable