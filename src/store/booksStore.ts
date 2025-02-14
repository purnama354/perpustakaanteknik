import { create } from "zustand"
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { BooksStore, Book } from "@/interfaces/store/store"

export const useBooksStore = create<BooksStore>((set) => ({
  books: [],
  isLoading: false,
  error: null,

  initializeBooksListener: () => {
    set({ isLoading: true })

    const booksRef = collection(db, "books")
    const q = query(booksRef, orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const books = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        })) as Book[]
        set({ books, isLoading: false })
      },
      (error) => {
        console.error("Books listener error:", error)
        set({ error: "Failed to fetch books", isLoading: false })
      }
    )

    return unsubscribe
  },

  addBook: async (bookData) => {
    try {
      await addDoc(collection(db, "books"), {
        ...bookData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } catch {
      set({ error: "Failed to add book" })
    }
  },

  updateBook: async (id, updates) => {
    try {
      const bookRef = doc(db, "books", id)
      await updateDoc(bookRef, {
        ...updates,
        updatedAt: new Date(),
      })
    } catch {
      set({ error: "Failed to update book" })
    }
  },
}))
