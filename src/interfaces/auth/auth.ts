export interface LoginValues {
  email: string
  password: string
}

export interface RegisterValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: "student" | "lecturer" | "admin"
}

export interface AdminUser extends RegisterValues {
  role: "admin"
}

export interface AdminRegisterValues {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AdminAuthResponse {
  uid: string
  email: string
  name: string
  role: string
  createdAt?: string
}
