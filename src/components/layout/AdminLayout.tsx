"use client"

import { ReactNode, useEffect } from "react"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

interface AdminLayoutProps {
  children: ReactNode
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/admin/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return <div className="min-h-screen bg-gray-100">{children}</div>
}
