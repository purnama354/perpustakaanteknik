export interface User {
  uid: string
  email: string
  role: "admin" | "lecturer" | "student"
  name: string
  photoURL?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  setUser: (user: User | null) => void
  logout: () => Promise<void>
  setLoading: (loading: boolean) => void
}

export interface AdminStats {
  totalBooks: number
  activeLoans: number
  totalUsers: number
  overdueLoans: number
}

export interface Activity {
  id: string
  type: string
  description: string
  timestamp: Date
  userId?: string
  metadata?: Record<string, unknown>
}

export interface AdminStore {
  stats: AdminStats
  recentActivities: Activity[]
  isLoading: boolean
  error: string | null
  initializeStatsListener: () => () => void
  initializeActivityListener: () => () => void
  addActivity: (activity: Omit<Activity, "id" | "timestamp">) => void
  setStats: (stats: AdminStats) => void
}

export interface Book {
  id: string
  title: string
  author: string
  category: string
  numberOfCopies: number
  availability: number
  coverUrl?: string
  createdAt: Date
  updatedAt: Date
}

export interface BooksStore {
  books: Book[]
  isLoading: boolean
  error: string | null
  fetchBooks: () => Promise<void>
  addBook: (book: Omit<Book, "id" | "createdAt" | "updatedAt">) => Promise<void>
  updateBook: (id: string, updates: Partial<Book>) => Promise<void>
}
