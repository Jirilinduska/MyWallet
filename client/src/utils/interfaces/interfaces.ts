import { ReactNode } from "react"



// PrivateRoute
export interface IPrivateRoute {
    children: ReactNode
}

// ProgressBar
export interface IProgressBar {
    stage: number
}



// =========== APIs ===========
export interface ICompleteProfileData {
    lang: string,
    curr: string,
    avatarID: number
}