import { Activity } from "@/interfaces/store/store"

export type ButtonProps = {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  isLoading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export type InputProps = {
  label?: string
  error?: string
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export type CardProps = {
  children: React.ReactNode
  className?: string
}

export interface StatCardProps {
  title: string
  value: number
  icon: string
  alert?: boolean
}

export interface ActivityItemProps {
  activity: Activity
}
