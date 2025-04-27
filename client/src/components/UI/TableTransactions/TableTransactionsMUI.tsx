import { Button, Paper } from "@mui/material"
import { ITransaction } from "../../../utils/interfaces/interfaces";
import { useUserContext } from "../../../context/UserContext"
import { formatLang } from "../../../utils/functions/formatLang"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useCategoriesContext } from "../../../context/CategoriesContext"
import { PAGE_ID_INCOME, PAGE_ID_TRANSACTIONS } from "../../../config/globals"
import "../../../styles/table.css"

interface TableTransactionsProps {
  data: ITransaction[];
  transType: string;
  setSelectedTransaction: (transaction: ITransaction) => void;
  toggleEditModal: () => void;
}

const TableTransactionsMUI = ({ data, transType, setSelectedTransaction, toggleEditModal } : TableTransactionsProps) => {

    const { userLangID } = useUserContext()

    const columns: GridColDef[] = [
        { field: 'date', headerName: formatLang(userLangID, "Datum", "Date"), flex: 1, disableColumnMenu: true, headerClassName: "super-app-theme--header"},
        { field: 'title', headerName: formatLang(userLangID, "Název", "Title"), flex: 1, disableColumnMenu: true, sortable: false, headerClassName: "super-app-theme--header", },
        { field: 'categoryName', headerName: formatLang(userLangID, "Kategorie", "Category"), flex: 1, disableColumnMenu: true, headerClassName: "super-app-theme--header"  },
        { field: 'amount', headerName: formatLang(userLangID, "Částka", "Amount"), flex: 1, disableColumnMenu: true, headerClassName: "super-app-theme--header"  },
        { 
            field: 'edit', 
            headerName: "", 
            flex: 1, 
            disableColumnMenu: true, 
            sortable: false, 
            headerClassName: "super-app-theme--header", 
            renderCell: (params) => (
              <Button 
                variant="text" 
                fullWidth
                onClick={() => {
                  setSelectedTransaction(params.row)
                  toggleEditModal()
                }}
              >
                Edit
              </Button>
            ) 
          }
    ]

      const { categoriesIncome, categoriesTransactions } = useCategoriesContext()

      const rows = data.map(oneTrans => {
        const categoryID = oneTrans.category
        let categoryName = ""
    
        if (transType === PAGE_ID_INCOME) {
            categoryName = categoriesIncome.find(cat => cat._id === categoryID)?.name || formatLang(userLangID, "Neznámá kategorie", "Unknown category")
        } else if (transType === PAGE_ID_TRANSACTIONS) {
            categoryName = categoriesTransactions.find(cat => cat._id === categoryID)?.name || formatLang(userLangID, "Neznámá kategorie", "Unknown category")
        }
    
        return {
            id: oneTrans._id,
            date: `${oneTrans.day}.${oneTrans.month}`,
            title: oneTrans.title,
            categoryName: categoryName,
            amount: oneTrans.amount,
            month: oneTrans.month,
            year: oneTrans.year,
            day: oneTrans.day,
            _id: oneTrans._id,
            category: categoryID
        }
    })

  return (
<Paper sx={{ height: "auto", width: '100%', bgcolor: "#fff", mb: 14 }}>
    <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 15 } } }}
        pageSizeOptions={[15, rows.length]}
        disableColumnResize
        sx={{
            "& .MuiDataGrid-cell": { color: "primary.text" },
        }}
    />
</Paper>
  );
};

export default TableTransactionsMUI;
