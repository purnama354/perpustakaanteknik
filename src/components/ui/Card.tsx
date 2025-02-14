import { CardProps } from "@/interfaces/ui/components"

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`
      rounded-xl bg-white p-6 shadow-lg
      transition-all duration-200 hover:shadow-xl
      ${className}
    `}
    >
      {children}
    </div>
  )
}
