import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { AdminStats } from "@/interfaces/store/store"

export const initializeAdminData = async () => {
  try {
    await setDoc(
      doc(db, "stats", "dashboard"),
      {
        totalBooks: 0,
        activeLoans: 0,
        totalUsers: 0,
        overdueLoans: 0,
      },
      { merge: true }
    )
  } catch (error) {
    console.error("Error initializing admin data:", error)
  }
}

export const updateStats = async (changes: Partial<AdminStats>) => {
  try {
    const statsRef = doc(db, "stats", "dashboard")
    await setDoc(statsRef, changes, { merge: true })
  } catch (error) {
    console.error("Error updating stats:", error)
  }
}
