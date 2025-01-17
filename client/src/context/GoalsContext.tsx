import React, { createContext, useContext, useEffect, useState } from "react"
import { IGoal } from "../utils/interfaces/interfaces"
import { handleCreateGoal, handleDeleteGoal, handleEditGoal, handleGetGoals, handleSetGoalFinished } from "../API/Goals"
import { handleNotification } from "../utils/functions/notificationsUtils"
import { NOTIF_SUCCESS } from "../config/globals"
import { useUserContext } from "./UserContext"
import { handleError } from "../Errors/handleError"


interface GoalsContextProps {
    listOfGoals: IGoal[] | null
    loading: boolean
    createGoal: (newGoal: IGoal) => void
    deleteGoal: (goalID: string) => void
    setFinishedGoal: (goalID: string) => void
    editGoal: (goalID: string, goal: IGoal) => void
}

export const GoalsContext = createContext<GoalsContextProps | undefined>(undefined)

export const GoalsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { userLangID } = useUserContext()

    const [listOfGoals, setListOfGoals] = useState<IGoal[] | null>(null)
    const [loading, setLoading] = useState(false)


    // POST - Create goal
    const createGoal = async(newGoal: IGoal) => {
        setLoading(true)
        try {
            await handleCreateGoal(newGoal)
            await getGoals()
            handleNotification(NOTIF_SUCCESS, userLangID, "Uloženo", "Saved")
        } catch (error) {
            handleError(error, userLangID)
        } finally {
            setLoading(false)
        }
    }

    // POST - Set finished goal
    const setFinishedGoal = async(goalID: string) => {
        try {
            await handleSetGoalFinished(goalID)
            await getGoals()
        } catch (error) {
            handleError(error, userLangID)
        }
    }

    // PATCH - Edit goal
    const editGoal = async(goalID: string, goal: IGoal) => {
        setLoading(true)
        try {
            await handleEditGoal(goalID, goal)
            await getGoals()
            handleNotification(NOTIF_SUCCESS, userLangID, "Uloženo", "Saved")
        } catch (error) {
            handleError(error, userLangID)
        } finally {
            setLoading(false)
        }
    }

    // GET - Get goals
    const getGoals = async() => {

        setLoading(true)
        try {
            const response = await handleGetGoals()
            setListOfGoals(response.data)
        } catch (error) {
            handleError(error, userLangID)
        } finally {
            setLoading(false)
        }
    }

    // DELETE - Delete goal
    const deleteGoal = async(goalID: string) => {
        try {
            await handleDeleteGoal(goalID)
            setListOfGoals((prev) => (prev ? prev.filter((goal) => goal._id !== goalID) : []))
        } catch (error) {
            handleError(error, userLangID)
        }
    }

    useEffect(() => {
        getGoals()
    }, [] )

    return(
        <GoalsContext.Provider value={{ listOfGoals, loading, createGoal, deleteGoal, setFinishedGoal, editGoal }}>
            { children }
        </GoalsContext.Provider>
    )
}

export const useGoalsContext = () => {
    const context = useContext(GoalsContext)
    if (!context) {
        throw new Error("GoalsContext must be used within an GoalsProvider")
    }
    return context
}