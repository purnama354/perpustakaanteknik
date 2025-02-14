"use client"

import { useEffect, useRef } from "react"
import { useBooksStore } from "@/store/booksStore"

export const BookList = () => {
  const { books, isLoading, error, initializeBooksListener } = useBooksStore()
  const unsubscribeRef = useRef<(() => void) | undefined>()

  useEffect(() => {
    // Initialize real-time listener
    unsubscribeRef.current = initializeBooksListener()

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [initializeBooksListener])

  if (isLoading) {
    return <div className="text-center">Loading books...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {books.map((book) => (
          <li key={book.id}>
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-600 truncate">
                    {book.title}
                  </p>
                  <p className="text-sm text-gray-500">by {book.author}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      book.availability > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.availability} available
                  </span>
                  <button
                    onClick={() => {
                      /* Edit book handler */
                    }}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
