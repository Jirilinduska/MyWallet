import { apiClient } from "../config/apiClient"
import { URL_DELETE_GOAL, URL_GET_GOALS, URL_NEW_GOAL, URL_SET_GOAL_FINISHED } from "../config/apiUrls"
import { IGoal } from "../utils/interfaces/interfaces"


export const handleCreateGoal = async(newGoal: IGoal) => {

    const response = await apiClient.post(URL_NEW_GOAL, newGoal)
    return response
}

export const handleGetGoals = async() => {

    const response = await apiClient.get(URL_GET_GOALS)
    return response
}

export const handleDeleteGoal = async(goalID: string) => {

    const response = await apiClient.delete(`${URL_DELETE_GOAL}/${goalID}`)
    return response
}

export const handleSetGoalFinished = async(goalID: string) => {

    const response = await apiClient.post(`${URL_SET_GOAL_FINISHED}/${goalID}`)
    return response
}