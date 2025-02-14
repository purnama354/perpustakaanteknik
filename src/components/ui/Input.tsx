import { InputProps } from "@/interfaces/ui/components"

export const Input = ({
  label,
  error,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        className={`
          rounded-lg border border-gray-300 px-4 py-2
          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
          ${error ? "border-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  )
}
