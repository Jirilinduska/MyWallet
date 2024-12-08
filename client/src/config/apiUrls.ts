const API_BASE_URL = process.env.REACT_APP_BASE_URL

// Autorizace
export const URL_REGISTER_USER = `${API_BASE_URL}/api/auth/register`
export const URL_LOGIN_USER = `${API_BASE_URL}/api/auth/login`

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

// Income
export const URL_GET_INCOME = `${API_BASE_URL}/api/income/get-income`
export const URL_NEW_INCOME = `${API_BASE_URL}/api/income/new-income`

// Category
export const URL_GET_CATEGORIES = `${API_BASE_URL}/api/category/get-category`
export const URL_NEW_CATEGORY = `${API_BASE_URL}/api/category/new-category`
// export const URL_DELETE_CATEGORIES = `${API_BASE_URL}/api/category/delete`