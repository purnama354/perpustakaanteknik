import { auth, db } from "@/lib/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { useAuthStore } from "@/store/authStore"
import { setCookie, deleteCookie } from "cookies-next"
import { AdminAuthResponse } from "@/interfaces/auth/auth"

export const adminAuth = {
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<AdminAuthResponse> => {
    try {
      useAuthStore.getState().setLoading(true)

      // Verify admin email domain
      if (!email.endsWith("@admin.university.ac.id")) {
        throw new Error("Invalid admin email domain")
      }

      // Create auth user first
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const userData: AdminAuthResponse = {
        uid: user.uid,
        email: user.email!,
        name,
        role: "admin",
        createdAt: new Date().toISOString(),
      }

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), userData)

      // Initialize admin data
      await initializeAdminData()

      // Update auth store
      useAuthStore.getState().login({
        uid: user.uid,
        email: user.email!,
        name,
        role: "admin",
      })

      setCookie("role", "admin", {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      return userData
    } catch (error: unknown) {
      useAuthStore.getState().setLoading(false)
      if ((error as { code: string }).code === "auth/email-already-in-use") {
        throw new Error("Email already registered")
      }
      throw error
    }
  },

  login: async (email: string, password: string) => {
    try {
      useAuthStore.getState().setLoading(true)

      const { user } = await signInWithEmailAndPassword(auth, email, password)

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid))
      if (!userDoc.exists()) {
        throw new Error("User data not found")
      }

      const userData = userDoc.data()
      if (userData.role !== "admin") {
        throw new Error("Unauthorized access")
      }

      // Use login instead of setUser
      useAuthStore.getState().login({
        uid: user.uid,
        email: user.email!,
        name: userData.name,
        role: userData.role,
      })

      setCookie("role", "admin", {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })

      return userData
    } catch (error) {
      useAuthStore.getState().setLoading(false)
      throw error
    }
  },

  logout: async () => {
    try {
      useAuthStore.getState().setLoading(true)
      await signOut(auth)
      useAuthStore.getState().logout()
      deleteCookie("role")
    } catch (error) {
      useAuthStore.getState().setLoading(false)
      throw error
    }
  },
}
