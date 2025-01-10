import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../../context/UserContext"
import { formatLang } from "../../utils/functions/formatLang"
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from "react"

const EmailConfirmed = () => {

  const { userLangID, userData } = useUserContext()
  const location = useLocation()
  const navigate = useNavigate()

  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null)

  useEffect(() => {
    if (userData && userData.settings.emailConfirmed) {
        navigate("/")
    }
}, [userData, navigate])

  // * url:  return res.redirect(`${process.env.FRONTEND_URL}/email-confirmed?confirmed=true`)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const confirmed = queryParams.get("confirmed") === "true"
    setIsConfirmed(confirmed)
  }, [location])

  const message = isConfirmed
    ? formatLang(userLangID, "Vaše e-mailová adresa byla úspěšně potvrzena", "Your email address has been successfully confirmed")
    : formatLang(userLangID, "Potvrzení e-mailu se nezdařilo. Zkuste to prosím znovu.", "Email confirmation failed. Please try again.")

  return (
    <section className="h-screen flex items-center justify-center flex-col">

            <div className="w-[200px] h-[200px] mb-10">
              <img 
                src="/images/utils/email_confirmed.png" 
                alt="email_confirmed" 
                className="" 
              />
            </div>

            { !isConfirmed && <h2 className="text-2xl text-red-500 mb-10">{formatLang(userLangID, "CHYBA", "ERROR")}</h2> }

            <p className="mb-10">{message}</p>

            <Link to="/" className="button-green">{formatLang(userLangID, "Domů", "Home")}</Link>

    </section>
  )
}

export default EmailConfirmed