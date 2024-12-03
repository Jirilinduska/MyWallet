export const handleLogOut = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
}