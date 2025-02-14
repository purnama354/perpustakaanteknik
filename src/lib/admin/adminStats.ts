import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useAdminStore } from "@/store/adminStore"

export const fetchAdminStats = async () => {
  try {
    // Get total books
    const booksSnapshot = await getDocs(collection(db, "books"))
    const totalBooks = booksSnapshot.size

    // Get active loans
    const loansQuery = query(
      collection(db, "loans"),
      where("status", "==", "active")
    )
    const activeLoansSnapshot = await getDocs(loansQuery)
    const activeLoans = activeLoansSnapshot.size

    // Get total users
    const usersSnapshot = await getDocs(collection(db, "users"))
    const totalUsers = usersSnapshot.size

    // Get overdue loans
    const overdueQuery = query(
      collection(db, "loans"),
      where("status", "==", "overdue")
    )
    const overdueLoansSnapshot = await getDocs(overdueQuery)
    const overdueLoans = overdueLoansSnapshot.size

    const stats = {
      totalBooks,
      activeLoans,
      totalUsers,
      overdueLoans,
    }

    useAdminStore.getState().setStats(stats)
    return stats
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    throw error
  }
}
