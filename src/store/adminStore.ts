// src/store/adminStore.ts
import { create } from "zustand"
import { AdminStore, AdminStats, Activity } from "@/interfaces/store/store"
import {
  doc,
  collection,
  query,
  limit,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { initializeAdminData, updateStats } from "@/lib/admin/initializeAdmin"

export const useAdminStore = create<AdminStore>((set) => ({
  stats: {
    totalBooks: 0,
    activeLoans: 0,
    totalUsers: 0,
    overdueLoans: 0,
  },
  recentActivities: [],
  isLoading: false,
  error: null,

  initializeStatsListener: () => {
    set({ isLoading: true })

    // Initialize stats document if it doesn't exist
    initializeAdminData()

    const unsubscribe = onSnapshot(
      doc(db, "stats", "dashboard"),
      (doc) => {
        if (doc.exists()) {
          const statsData = doc.data() as AdminStats
          set({ stats: statsData, isLoading: false })
        } else {
          set({
            stats: {
              totalBooks: 0,
              activeLoans: 0,
              totalUsers: 0,
              overdueLoans: 0,
            },
            isLoading: false,
          })
        }
      },
      (error) => {
        console.error("Stats listener error:", error)
        set({ error: error.message, isLoading: false })
      }
    )

    return unsubscribe
  },

  initializeActivityListener: () => {
    set({ isLoading: true })

    const activitiesRef = collection(db, "activities")
    const q = query(activitiesRef, orderBy("timestamp", "desc"), limit(10))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const activities = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date(),
          })) as Activity[]
          set({ recentActivities: activities, isLoading: false })
        } else {
          set({ recentActivities: [], isLoading: false })
        }
      },
      (error) => {
        console.error("Activities listener error:", error)
        set({ error: error.message, isLoading: false })
      }
    )

    return unsubscribe
  },

  addActivity: async (activity: Omit<Activity, "id" | "timestamp">) => {
    try {
      // Add to Firestore
      await addDoc(collection(db, "activities"), {
        ...activity,
        timestamp: serverTimestamp(),
      })
    } catch (error) {
      console.error("Error adding activity:", error)
      set({ error: "Failed to add activity" })
    }
  },

  setStats: async (stats: Partial<AdminStats>) => {
    try {
      await updateStats(stats)
    } catch (error) {
      console.error("Error updating stats:", error)
      set({ error: "Failed to update stats" })
    }
  },
}))
