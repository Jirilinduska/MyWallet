import { ChangeEvent, ReactElement } from "react"
import { BudgetCategories2 } from "../../components/UI/OneBudgetPreview/OneBudgetPreview"


// * =========== Datové struktury ===========
export interface CategoryDetails {
    categoryName: string;
    categoryIcon: JSX.Element | null
  }

  export interface IGetBudgetCategories {
    categoryID: {
      iconID: number,
      name: string,
      _id: string
    }
    price: number
    spent: number
    _id: string
  }

export interface IGetBudget {
    budgetCategories: BudgetCategories2[]
    month: number
    year: number
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

export interface ITodayData {
    todayExpense: ITransaction[]
    lastIncome: ITransaction
    lastExpense: ITransaction
    lastExpenseCategory: ICategory
    lastIncomeCategory: ICategory
  }

export interface IcategoriesYearOverview {
    _id: string,
    total: number,
    categoryID: string,
    // categoryIconID: number
}

export interface IOverviewMonths {
    month: number,
    year: number,
    expense: number,
    income: number,
    saved: number
}

export interface IOverviewData {
    yearTotalExpense: number
    yearTotalIncome: number
    savedThisYear: number
    monthTotalExpense: number
    monthTotalIncome: number
    savedThisMonth: number
    monthBudget: number
    categoriesYearExpense: IcategoriesYearOverview[]
    categoriesYearIncome: IcategoriesYearOverview[]
    overviewMonths: IOverviewMonths[]
}

export interface ICategoryPreview {
    categoryID: string
    categoryName: string
    iconID: number,
    categoryType: string
    yearlyTotals: {[key: string]: number}
    totalAmount: number
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
    isAdmin: boolean
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

interface MaxTransaction {
    amount: number;
    createdAt: Date;
    title: string;
  }
  
  export interface CategorySummary {
    categoryID: string; 
    total: number;
    count: number;
    maxTransaction: MaxTransaction | null;
    planned: number;
  }
  
  export interface IMonthlySummary {
    _id: string;
    createdBy: string;
    expenseByCategory: CategorySummary[];
    incomeByCategory: CategorySummary[];
    month: number;
    totalExpense: number;
    totalIncome: number;
    year: number;
  }

export interface IAdminData {
    usersCount: number
    allUsersData: IAdminDataUsers[]
    appSettings: {  
        allowRegistration: boolean
        isMaintenance: boolean
    }
    dbData: {
        collections: number,
        objects: number,
        storage: string,
        storageUsedMB: number,
        MAX_STORAGE_MB: number,
        usagePercent: number,
    }
}

export interface IAdminDataUsers {
    settings: {
        profileCompleted: boolean
        emailConfirmed: boolean
        canBeDeleted: boolean
    }
    _id: string
    userName: string
    email: string
    lastOnline: string
    isAdmin: boolean
}
  


// * =========== Props ===========

export interface IInputSelect{
    value: string
    handleChange?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    handleChangeCategory?: (value: string) => void
}

export interface IInputSelectCategory extends IInputSelect {
    categoryType: string
}