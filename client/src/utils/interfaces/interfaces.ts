import { ChangeEvent, ReactElement, ReactNode } from "react"


// * =========== Základní typy ===========
export interface IString {
    value: string
}

// * =========== Komponenty (Props) ===========

export interface CrateBudgetProps {
    newBudget: INewBudget
    setNewBudget: React.Dispatch<React.SetStateAction<INewBudget>>
}

export interface MonthYearPickerProps {
    userLangID: string;
    setNewBudget: React.Dispatch<React.SetStateAction<INewBudget>>
}

// * =========== Datové struktury ===========

export interface IBudget {
    _id: string
    year: number
    month: number
    budgetCategories: IBudgetCategories[]
    totalPricePlanned: number
}

export interface IBudgetCategories {
    iconID: number
    name: string
    _id: string
}

export interface INewBudget {
    month: number,
    year: number,
    budgetCategories: INewBudgetCategories[]
}

export interface INewBudgetCategories {
    categoryID: string,
    price: string
}


// ! ===================

export interface IInputSelect{
    value: string
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export interface IInputSelectCategory extends IInputSelect {
    categoryType: string
}

// PrivateRoute
export interface IPrivateRoute {
    children: ReactNode
}

// ProgressBar
export interface IProgressBar {
    stage: number
}

export interface ITableHeaderSortable {
    value: string
    handleSort: () => void
}

// TableRow
export interface ITableRow {
    dateValue: string
    titleValue: string
    categoryValue: string
    priceValue: number
    toggleEditModal: () => void
    userLangID: string
    userCurrency: string
}

// NewTransModal
export interface INewTransModal {
    handleHide: () => void
    fetchTransData: () => void
    fetchIncomeData: () => void
    pageID: string | undefined
    langID: string
}

// NewTransForm
export interface INewTransForm {
    handleHide: () => void,
    fetchTransData: () => void
    fetchIncomeData: () => void
    pageID: string | undefined
}

// Notifications
export interface INotif {
    message: string
    onClose: () => void
}

// Icon
export interface ICategoryIcon {
    id: number
    iconJSX: ReactElement
}

// EditTransModal
export interface IEditTransModal {
    toggleEditModal: () => void
    transaction: ITransaction
    fetchTransData: () => void
    pageID: string | undefined
}

// TransactionsTable
export interface ITransactionsTable {
    data: (ITransaction & { onEdit: () => void })[]
}

// PieGraph
export interface IPieGraph {
    graphData: IGraphBreakdownData[]
    pageID: string | undefined
    langID: string
}

// Avatars
export interface IAvatars {
    showAvatars: boolean
    setUserInfo: React.Dispatch<React.SetStateAction<IUserDataUpdate>>
    setIsEdited: (state: boolean) => void
    setShowAvatars: (state: boolean) => void
}

// MonthNavigator
export interface IMonthNavigator {
    pageID: string | undefined
    handlePrevMonth: () => void
    handleNextMonth: () => void
    monthName: string
    year: number
    month: number
    fetchTransData: () => void
    fetchIncomeData: () => void
}

// =========== APIs ===========
export interface ICompleteProfileData {
    lang: string
    curr: string
    avatarID: number
}

export interface ITransaction {
    _id: string
    title: string
    amount: number
    category: string
    year: number
    month: number
    day: number
}

export interface IGraphBreakdownData {
    category: string,
    totalAmount: number
}

export interface ICategory {
    _id: string,
    name: string,
    iconID: number,
    categoryType: string,
    createdBy: string,
    __v: number
}

export interface INewCategory {
    id: string
    name: string
    iconID: number
    categoryType: string
}

export interface IUser {
    _id: string
    userName: string
    email: string
    utils: IUserUtils
    settings: IUserSettings
}

interface IUserUtils {
    currency: string
    language: string
    avatarID: number
}

interface IUserSettings {
    profileCompleted: boolean
    emailConfirmed: boolean
}

export interface IUserDataUpdate {
    userName: string
    email: string
    currency: string
    language: string
    avatarID: number
}