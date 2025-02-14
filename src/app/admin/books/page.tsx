"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { BookList } from "@/components/admin/books/BookList"
import { AddBookForm } from "@/components/admin/books/AddBookForm"

export default function BooksPage() {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl text-gray-700 font-semibold">
            Book Management
          </h1>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            onClick={openModal}
          >
            Add New Book
          </button>
        </div>
        <BookList />
        {isOpen && <AddBookForm onClose={closeModal} />}
      </div>
    </AdminLayout>
  )
}
