"use client"

import { useEffect, useRef } from "react"
import { useAuthStore } from "@/store/authStore"
import { useAdminStore } from "@/store/adminStore"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/layout/AdminLayout"
import Link from "next/link"
import Image from "next/image"
import { StatCard } from "@/components/admin/dashboard/StatCard"
import { ActivityItem } from "@/components/admin/dashboard/ActivityItem"

export const AdminDashboard = () => {
  const { user, logout } = useAuthStore()
  const {
    stats,
    recentActivities,
    isLoading,
    error,
    initializeStatsListener,
    initializeActivityListener,
  } = useAdminStore()
  const router = useRouter()

  // Create refs to store unsubscribe functions
  const unsubscribeStatsRef = useRef<(() => void) | undefined>(undefined)
  const unsubscribeActivitiesRef = useRef<(() => void) | undefined>(undefined)

  useEffect(() => {
    const setupListeners = async () => {
      try {
        // Store unsubscribe functions in refs
        unsubscribeStatsRef.current = initializeStatsListener()
        unsubscribeActivitiesRef.current = initializeActivityListener()
      } catch (error) {
        console.error("Error setting up listeners:", error)
      }
    }

    if (user?.role === "admin") {
      setupListeners()
    }

    return () => {
      // Cleanup listeners using refs
      if (unsubscribeStatsRef.current) {
        unsubscribeStatsRef.current()
      }
      if (unsubscribeActivitiesRef.current) {
        unsubscribeActivitiesRef.current()
      }
    }
  }, [user?.role, initializeStatsListener, initializeActivityListener])

  const handleLogout = async () => {
    try {
      // Clean up listeners using refs
      if (unsubscribeStatsRef.current) {
        unsubscribeStatsRef.current()
      }
      if (unsubscribeActivitiesRef.current) {
        unsubscribeActivitiesRef.current()
      }

      await logout()
      router.push("/admin/auth/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="text-red-500 text-center">{error}</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="flex h-screen w-64 flex-col justify-between border-e bg-white">
          <div className="px-4 py-6">
            <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
              Library Admin
            </span>

            <nav className="mt-6 space-y-1">
              <Link
                href="/admin/dashboard"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/books"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Book Management
              </Link>

              <Link
                href="/admin/users"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                User Management
              </Link>

              <Link
                href="/admin/loans"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Loan Management
              </Link>

              <Link
                href="/admin/reports"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Reports
              </Link>
            </nav>
          </div>

          <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
            <div className="flex items-center gap-2 bg-white p-4">
              <Image
                alt={user?.name || "Admin"}
                src={user?.photoURL || "/default-avatar.png"} // Use a default avatar image
                className="size-10 rounded-full object-cover"
                width={40}
                height={40}
              />

              <div>
                <p className="text-xs">
                  <strong className="block font-medium text-gray-600">
                    {user?.name}
                  </strong>
                  <span>{user?.email}</span>
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="ml-auto text-sm text-black hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main content with real-time updates */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stats cards */}
              <StatCard
                title="Total Books"
                value={stats.totalBooks}
                icon="📚"
              />
              <StatCard
                title="Active Loans"
                value={stats.activeLoans}
                icon="📖"
              />
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon="👥"
              />
              <StatCard
                title="Overdue Loans"
                value={stats.overdueLoans}
                icon="⚠️"
                alert={stats.overdueLoans > 0}
              />
            </div>

            {/* Recent Activities */}
            <div className="mt-8">
              <h2 className="text-lg font-medium mb-4">Recent Activities</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
