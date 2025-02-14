import { create } from "zustand"
import { persist } from "zustand/middleware"
import { AuthState, User } from "@/interfaces/store/store"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"
import { deleteCookie } from "cookies-next"

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      login: (user: User) =>
        set({ user, isAuthenticated: true, isLoading: false }),
      setUser: (user: User | null) =>
        set({ user, isAuthenticated: !!user, isLoading: false }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      logout: async () => {
        try {
          set({ isLoading: true })
          // Sign out from Firebase first
          await signOut(auth)
          // Then clean up local state
          deleteCookie("role", { path: "/" })
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          console.error("Logout error:", error)
          throw error
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
)
