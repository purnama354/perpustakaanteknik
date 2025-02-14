"use client"

import { useState } from "react"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"

import { useBooksStore } from "@/store/booksStore"

interface AddBookFormProps {
  onClose: () => void
}

export const AddBookForm = ({ onClose }: AddBookFormProps) => {
  const router = useRouter()
  const { addBook } = useBooksStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      category: "",
      numberOfCopies: 1,
      coverUrl: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      setError(null)

      try {
        await addBook({
          title: values.title,
          author: values.author,
          category: values.category,
          numberOfCopies: values.numberOfCopies,
          availability: values.numberOfCopies,
          coverUrl: values.coverUrl,
        })
        onClose()
        router.refresh()
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message || "Failed to add book")
        } else {
          setError("Failed to add book")
        }
      } finally {
        setIsLoading(false)
      }
    },
  })

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add New Book
            </h3>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <form onSubmit={formik.handleSubmit} className="mt-4">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="author"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  onChange={formik.handleChange}
                  value={formik.values.author}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="numberOfCopies"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Number of Copies
                </label>
                <input
                  type="number"
                  id="numberOfCopies"
                  name="numberOfCopies"
                  onChange={formik.handleChange}
                  value={formik.values.numberOfCopies}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="coverUrl"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Cover URL
                </label>
                <input
                  type="text"
                  id="coverUrl"
                  name="coverUrl"
                  onChange={formik.handleChange}
                  value={formik.values.coverUrl}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {isLoading ? "Adding..." : "Add Book"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
