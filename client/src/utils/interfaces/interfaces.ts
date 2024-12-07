import { ChangeEvent, ReactNode } from "react"


// =========== Základní typy ===========
export interface IString {
    value: string
}

// =========== Komponenty ===========

export interface IInputSelect{
    value: string
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
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
}

// NewTransModal
export interface INewTransModal {
    handleHide: () => void
    refetchData: () => void
}

// NewTransForm
export interface INewTransForm {
    handleHide: () => void,
    refetchData: () => void
}

// EditTransModal
export interface IEditTransModal {
    toggleEditModal: () => void
    transaction: ITransaction
    fetchTransData: () => void
}

// TransactionsTable
export interface ITransactionsTable {
    data: (ITransaction & { onEdit: () => void })[]
}

export interface IPieGraph {
    graphData: IGraphBreakdownData[]
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
    createdBy: string,
    __v: number
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