const API_BASE_URL = process.env.REACT_APP_BASE_URL

// Autorizace
export const URL_REGISTER_USER = `${API_BASE_URL}/api/auth/register`
export const URL_LOGIN_USER = `${API_BASE_URL}/api/auth/login`
export const URL_CHANGE_PASSWORD = `${API_BASE_URL}/api/auth/change-password`
export const URL_FORGOTTEN_PASSWORD = `${API_BASE_URL}/api/auth/forgotten-password`
export const URL_RESET_PASSWORD = `${API_BASE_URL}/api/auth/reset-password`
export const URL_CHECK_RESET_TOKEN = `${API_BASE_URL}/api/auth/verify-reset-token`
export const URL_DELETE_ACCOUNT = `${API_BASE_URL}/api/auth/delete-account`

// User
export const URL_COMPLETE_PROFILE = `${API_BASE_URL}/api/user/complete-profile`
export const URL_GET_USER_DATA = `${API_BASE_URL}/api/user/get-user-data`
export const URL_UPDATE_USER_DATA = `${API_BASE_URL}/api/user/update-user-data`

// Emails
export const URL_SEND_CONFIRM_EMAIL = `${API_BASE_URL}/api/email/confirm-email`

// Transaction
export const URL_NEW_TRANSACTION = `${API_BASE_URL}/api/transaction/new-transaction`
export const URL_GET_TRANSACTION = `${API_BASE_URL}/api/transaction/get-transaction`
export const URL_DELETE_TRANSACTION = `${API_BASE_URL}/api/transaction/delete`
export const URL_UPDATE_TRANSACTION = `${API_BASE_URL}/api/transaction/update`
export const URL_GET_TRANSACTIONS_BY_CAT = `${API_BASE_URL}/api/transaction/get-transactions-by-category`

// Income
export const URL_GET_INCOME = `${API_BASE_URL}/api/income/get-income`
export const URL_NEW_INCOME = `${API_BASE_URL}/api/income/new-income`

// Overview
export const URL_GET_OVERVIEW = `${API_BASE_URL}/api/overview/get-overview`

// Category
export const URL_GET_CATEGORIES = `${API_BASE_URL}/api/category/get-category`
export const URL_NEW_CATEGORY = `${API_BASE_URL}/api/category/new-category`
export const URL_UPDATE_CATEGORY = `${API_BASE_URL}/api/category/update-category`
export const URL_DELETE_CATEGORY = `${API_BASE_URL}/api/category/delete-category`
export const URL_GET_CATEGORY_INFO = `${API_BASE_URL}/api/category/get-category-info`

// Budget
export const URL_NEW_BUDGET = `${API_BASE_URL}/api/budget/new-budget`
export const URL_GET_BUDGET = `${API_BASE_URL}/api/budget/get-budget`
export const URL_DELETE_BUDGET = `${API_BASE_URL}/api/budget/delete-budget`
export const URL_UPDATE_BUDGET = `${API_BASE_URL}/api/budget/update-budget`

// Goal
export const URL_NEW_GOAL = `${API_BASE_URL}/api/goal/new-goal`
export const URL_GET_GOALS = `${API_BASE_URL}/api/goal/get-goals`
export const URL_DELETE_GOAL = `${API_BASE_URL}/api/goal/delete-goal`
export const URL_SET_GOAL_FINISHED = `${API_BASE_URL}/api/goal/set-finished`
export const URL_EDIT_GOAL = `${API_BASE_URL}/api/goal/edit-goal`