import { ChangeEvent, ReactElement } from "react"


// * =========== Datové struktury ===========
export interface CategoryDetails {
    categoryName: string;
    categoryIcon: JSX.Element | null
  }

export interface IGetBudgetCategories {
    category: {
        _id: string
        name: string
        iconID: number
    }
    price: number
    spent: number
}

export interface IGetBudget {
    budgetCategories: IGetBudgetCategories[]
    month: number
    year: number
    totalPricePlanned: number
    _id: string
    isFinished: boolean
}


export interface IBudget {
    _id: string
    year: number
    month: number
    budgetCategories: IBudgetCategories[]
    totalPricePlanned: number
    isFinished: boolean
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

export interface IcategoriesYearOverview {
    _id: string,
    totalAmount: number,
    categoryName: string,
    categoryIconID: number
}

export interface IOverviewData {
    yearTotalExpense: number
    yearTotalIncome: number
    savedThisYear: number
    monthTotalExpense: number
    monthTotalIncome: number
    savedThisMonth: number
    monthBudget: number
    todayExpense: ITransaction[] | null
    lastExpense: ITransaction
    lastExpenseCategory: ICategory
    lastIncome: ITransaction
    lastIncomeCategory: ICategory
    categoriesYearExpense: IcategoriesYearOverview[]
    categoriesYearIncome: IcategoriesYearOverview[]
}

export interface ICategoryPreview {
    categoryID: string
    categoryName: string
    iconID: number,
    categoryType: string
    totalAmount: number // Total za celou dobu
    transactionCount: number // Count za celou dobu
    averageAmount: number // Prumerna castka za celou dobu
    monthlySummary: { [key: string]: number }
    monthlyCounts: { [key: string]: number }
    largestTransaction: ITransaction, // Největší transakce za celou dobu :)
    largestTransactionsByMonth: ITransaction[]
    yearlySummary: { [key: string]: number }
}

export interface IGoal {
    _id?: string
    title: string
    amount: number
    year: number
    isPriority: boolean
    isFinished: boolean
    note: string
    finishedAt?: string
}

export interface ICategoryIcon {
    id: number
    iconJSX: ReactElement
}

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
    createdAt: Date
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

export interface ICategorySummary {
    categoryID: string
    planned: number
    spent: number
}

// * =========== Props ===========

export interface IInputSelect{
    value: string
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export interface IInputSelectCategory extends IInputSelect {
    categoryType: string
}