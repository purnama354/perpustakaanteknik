"use client"

import { AdminLayout } from "@/components/layout/AdminLayout"
import { Card } from "@/components/ui/Card"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuthStore } from "@/store/authStore"
import { User } from "@/interfaces/store/store"
import { useRouter } from "next/navigation"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuthStore()
  const router = useRouter()
  const [isAuthChecking, setIsAuthChecking] = useState(true)

  useEffect(() => {
    // Check if user is admin
    if (!user) {
      if (!isAuthChecking) {
        router.push("/login")
      }
    } else if (user.role !== "admin") {
      router.push("/login")
    } else {
      setIsAuthChecking(false)
    }

    const fetchUsers = async () => {
      try {
        setError(null)
        const usersSnapshot = await getDocs(collection(db, "users"))
        const usersData = usersSnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...(doc.data() as Omit<User, "uid">),
        }))
        setUsers(usersData)
      } catch (error) {
        console.error("Error fetching users:", error)
        setError("Failed to fetch users. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    if (user?.role === "admin") {
      fetchUsers()
    }
  }, [user, router, isAuthChecking])

  if (isAuthChecking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Management</h2>
          <span className="text-sm text-gray-500">
            Total Users: {users.length}
          </span>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user.uid} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <span
                      className={`inline-block px-2 py-1 mt-2 text-xs font-medium rounded-full 
                        ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "lecturer"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
