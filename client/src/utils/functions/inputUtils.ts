import { SetStateAction } from "react"


export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setStateObject: React.Dispatch<SetStateAction<any>>) => {
    const { name, value } = e.target
    setStateObject( (prev: any) => ({...prev, [name]: value}) )
} 