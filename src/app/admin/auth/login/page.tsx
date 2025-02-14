import { AdminLoginForm } from "@/components/admin/auth/AdminLoginForm"
import { AuthLayout } from "@/components/layout/AuthLayout"

export default function AdminLoginPage() {
  return (
    <AuthLayout>
      <AdminLoginForm />
    </AuthLayout>
  )
}
