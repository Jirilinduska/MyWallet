
export interface ButtonProps {
    className: string
    buttonValue: string
    handleClick: () => void
}

// TODO - Nahradit tlačítka touto komponentou 

const Button = ( { className, buttonValue, handleClick } : ButtonProps ) => {
    return <button onClick={handleClick} className={className}>{buttonValue}</button>
}

export default Button