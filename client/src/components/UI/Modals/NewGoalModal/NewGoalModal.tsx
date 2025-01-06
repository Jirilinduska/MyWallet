import { ChangeEvent, useEffect, useState } from "react"
import Button from "../../../../better_components/UI/Button/Button"
import { COLOR_GREEN, COLOR_RED, NOTIF_ERROR, USE_CASE_CREATE, USE_CASE_EDIT } from "../../../../config/globals"
import { useUserContext } from "../../../../context/UserContext"
import { formatLang } from "../../../../utils/functions/formatLang"
import { IconClose } from "../../../../utils/icons/icons"
import Input from "../../Input/Input"
import { useGoalsContext } from "../../../../context/GoalsContext"
import { handleNotification } from "../../../../utils/functions/notificationsUtils"
import { IGoal } from "../../../../utils/interfaces/interfaces"


interface NewGoalModalProps {
    toggleModal: () => void
    useCase: string
    goal?: IGoal
}

const NewGoalModal = ({ toggleModal, useCase, goal } : NewGoalModalProps ) => {

    const { userLangID } = useUserContext()
    const { createGoal, loading, editGoal } = useGoalsContext()

    const [newGoal, setNewGoal] = useState({
        title: "",
        amount: 0,
        year: new Date().getFullYear(),
        isPriority: false,
        isFinished: false,
        note: "",
        finishedAt: "",
    })

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, i) => currentYear + i)

    useEffect(() => {
        if(useCase === USE_CASE_EDIT && goal) {
            setNewGoal({
                title: goal?.title,
                amount: goal?.amount,
                year: goal?.year,
                isPriority: goal?.isPriority,
                isFinished: goal?.isFinished,
                note: goal?.note,
                finishedAt: goal?.finishedAt || ""
            })
        }
    }, [] )

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target
        setNewGoal( (prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        if(!newGoal.title) {
            handleNotification(NOTIF_ERROR, userLangID, "Zadejte název cíle", "Enter name of goal")
            return
        }

        if(!newGoal.amount) {
            handleNotification(NOTIF_ERROR, userLangID, "Zadejte částku", "Enter amount")
            return
        }

        if(useCase === USE_CASE_CREATE) {
            createGoal(newGoal)
            toggleModal()
        }

        if(useCase === USE_CASE_EDIT && goal?._id) {
            editGoal(goal?._id, newGoal)
        }
    }

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-60">

        <div className="relative p-4 w-full max-w-md max-h-full">

            <div className="relative rounded-lg shadow bg-gray-700 pb-6">


                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                    <h3 className="text-lg font-semibold text-white">
                        { useCase === USE_CASE_CREATE ? formatLang(userLangID, "Nový cíl", "New goal") : formatLang(userLangID, `Upravit cíl: ${goal?.title}`, `Edit goal: ${goal?.title}`)}
                    </h3>
                    <IconClose onClick={toggleModal} className="icon"/>
                </div>

                {/* Form */}
                <form className="p-4 space-y-6" onSubmit={handleSubmit}>

                    {/* Název */}
                    <Input 
                        inputName="title"
                        inputType="text"
                        labelFor="title"
                        labelValue={formatLang(userLangID, "Název cíle*", "Name of goal*")}
                        onChange={handleInputChange}
                        placeholder={formatLang(userLangID, "Nové auto", "New car")}
                        value={newGoal.title}
                    />

                    {/* Částka */}
                    <Input 
                        inputName="amount"
                        inputType="number"
                        labelFor="amount"
                        labelValue={formatLang(userLangID, "Částka*", "Amount*")}
                        onChange={handleInputChange}
                        placeholder="2000"
                        value={newGoal.amount.toString()}
                    />

                    {/* Rok */}
                    <label htmlFor="year" className="block text-sm font-medium text-white">
                        
                        Vyber rok:
                        <select 
                            id="year" 
                            name="year" 
                            value={newGoal.year}
                            onChange={handleInputChange}
                            className="border mt-2 border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 bg-gray-600 text-white"
                        >
                            { years.map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Poznámka */}
                    <textarea 
                        name="note" 
                        onChange={handleInputChange}
                        value={newGoal.note}
                        id="note" 
                        placeholder={formatLang(userLangID, "Poznámka", "Note")}
                        className="border border-gray-300 h-20 resize-none text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2 bg-gray-600 text-white"
                    >
                    </textarea>

                    {/* Priorita */}
                    <label className="flex items-center justify-start cursor-pointer space-x-3">

                        <input
                            type="checkbox"
                            className="hidden"
                            checked={newGoal.isPriority}
                            onChange={(e) => setNewGoal((prev) => ({ 
                                ...prev, 
                                isPriority: e.target.checked 
                            }))}
                        />

                        <span
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${
                                newGoal.isPriority
                                    ? "bg-colorGreen border-colorGreen"
                                    : "bg-white border-gray-300"
                                }`}
                        >
                            { newGoal.isPriority && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-3 h-3 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </span>
                        
                        <span className="text-white text-sm">{formatLang(userLangID, "Nastavit jako prioritní cíl", "Set as priority goal")}</span>
                    </label>

                    <div className="flex items-center justify-between">
                        <Button value={formatLang(userLangID, "Uložit", "Save")} color={COLOR_GREEN} loading={loading} buttonType="submit" />
                        <Button value={formatLang(userLangID, "Zavřít", "Close")} color={COLOR_RED} loading={loading} buttonType="button" handleClick={toggleModal} />                        
                    </div>

                </form>


            </div>

        </div>

    </div>
  )
}

export default NewGoalModal