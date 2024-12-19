

export const formatColor = (color: string) => {

    let result = ""

    switch (color) {
        case "green":
            result = "#22c55e" // green-500
            break
        case "red":
            result = "#ef4444" // red-500
            break
        case "blue":
            result = "#3b82f6" // blue-500
            break
        case "orange":
            result = "#f97316" // orange-500
            break     
        default:
            break
    }

    return result
}