"use client"

import { useFormik } from "formik"
import { adminRegisterSchema } from "@/lib/validationSchemas"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AdminRegisterValues } from "@/interfaces/auth/auth"
import { adminAuth } from "@/lib/admin/adminAuth"

export const AdminRegisterForm = () => {
  const router = useRouter()

  const formik = useFormik<AdminRegisterValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: adminRegisterSchema,
    onSubmit: async (values) => {
      try {
        await adminAuth.register(values.name, values.email, values.password)
        router.push("/admin/dashboard")
      } catch (error: unknown) {
        console.error(error)
        formik.setErrors({
          email: error.message || "Registration failed",
        })
      }
    },
  })

  return (
    <div className="max-w-xl lg:max-w-3xl">
      <div className="relative -mt-16 block lg:hidden">
        <Link
          href="/"
          className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
        >
          <span className="sr-only">Home</span>
        </Link>

        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Admin Registration
        </h1>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="mt-8 grid grid-cols-6 gap-6"
      >
        <div className="col-span-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-sm text-red-500">{formik.errors.name}</p>
          )}
        </div>

        <div className="col-span-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Admin Email (@admin.university.ac.id)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-sm text-red-500">{formik.errors.password}</p>
          )}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="col-span-6">
          <p className="text-sm text-gray-500">
            By registering, you agree to our
            <Link href="/terms" className="text-gray-700 underline">
              {" "}
              terms and conditions{" "}
            </Link>
            and
            <Link href="/privacy" className="text-gray-700 underline">
              {" "}
              privacy policy
            </Link>
            .
          </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            {formik.isSubmitting
              ? "Creating account..."
              : "Create Admin Account"}
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Already have an account?
            <Link href="/admin/auth/login" className="text-gray-700 underline">
              Log in
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  )
}
