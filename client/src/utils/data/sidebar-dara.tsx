import { IconCard, IconCategory, IconDashboard, IconMoney, IconMoneyInHand, IconPiggyBank } from "../icons/icons"



export const sidebarData = [

    { id: 1, titleEN: "Overview", titleCS: "Přehled", icon: <IconDashboard/>, path: "/dashboard/overview" },
    { id: 2, titleEN: "Planner", titleCS: "Plánovač výdajů", icon: <IconMoneyInHand/>, path: "/dashboard/planner" },
    { id: 3, titleEN: "Transactions", titleCS: "Výdaje", icon: <IconCard/>, path: "/dashboard/transactions" },
    { id: 4, titleEN: "Income", titleCS: "Příjmy", icon: <IconMoney/>, path: "/dashboard/income" },
    { id: 5, titleEN: "Categories", titleCS: "Kategorie", icon: <IconCategory/>, path: "/dashboard/categories" },
    { id: 6, titleEN: "Goals", titleCS: "Cíle", icon: <IconPiggyBank/>, path: "/dashboard/goals" },

]