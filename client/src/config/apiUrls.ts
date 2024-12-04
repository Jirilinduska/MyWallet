const API_BASE_URL = process.env.REACT_APP_BASE_URL

// Autorizace
export const URL_REGISTER_USER = `${API_BASE_URL}/api/auth/register`
export const URL_LOGIN_USER = `${API_BASE_URL}/api/auth/login`

// User
export const URL_COMPLETE_PROFILE = `${API_BASE_URL}/api/user/complete-profile`

// Emails
export const URL_SEND_CONFIRM_EMAIL = `${API_BASE_URL}/api/email/confirm-email`