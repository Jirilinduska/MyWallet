import { ReactNode } from "react"


// =========== Základní typy ===========
export interface IString {
    value: string
}

// =========== Komponenty ===========

// PrivateRoute
export interface IPrivateRoute {
    children: ReactNode
}

// ProgressBar
export interface IProgressBar {
    stage: number
}

// TableRow
export interface ITableRow {
    dateValue: string
    titleValue: string
    categoryValue: string
    priceValue: number
    toggleEditModal: () => void
}

// NewTransModal
export interface INewTransModal {
    handleHide: () => void,
}

// NewTransForm
export interface INewTransForm {
    handleHide: () => void,
}

// EditTransModal
export interface IEditTransModal {
    toggleEditModal: () => void
  }

// =========== APIs ===========
export interface ICompleteProfileData {
    lang: string
    curr: string
    avatarID: number
}

export interface ITransaction {
    title: string
    amount: number
    category: string
    year: number
    month: number
    day: number
}

export interface ICategory {
    _id: string,
    name: string,
    iconID: number,
    createdBy: string,
    __v: number
}