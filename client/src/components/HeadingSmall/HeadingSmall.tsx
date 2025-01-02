
interface HeadingSmallProps {
    value: string
    className?: string
}

const HeadingSmall = ({ value, className } : HeadingSmallProps) => {
  return <h6 className={`${className} text-xs text-gray-500`}>{value}</h6>
}

export default HeadingSmall