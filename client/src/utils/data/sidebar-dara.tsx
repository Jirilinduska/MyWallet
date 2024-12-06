import { IconCard, IconDashboard, IconMoney, IconMoneyInHand } from "../icons/icons"



export const sidebarData = [

    { id: 1, titleEN: "Overview", titleCS: "Přehled", icon: <IconDashboard/>, path: "/dashboard/overview" },
    { id: 2, titleEN: "Transactions", titleCS: "Výdaje", icon: <IconCard/>, path: "/dashboard/transactions" },
    { id: 3, titleEN: "Income", titleCS: "Příjmy", icon: <IconMoney/>, path: "/dashboard/income" },
    { id: 4, titleEN: "Goals", titleCS: "Cíle", icon: <IconMoneyInHand/>, path: "/dashboard/goals" },

]