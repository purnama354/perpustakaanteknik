"use client"

import { useFormik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LoginValues } from "@/interfaces/auth/auth"
import { loginSchema } from "@/lib/validationSchemas"
import { adminAuth } from "@/lib/admin/adminAuth"

export const AdminLoginForm = () => {
  const router = useRouter()

  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        await adminAuth.login(values.email, values.password)
        router.push("/admin/dashboard")
      } catch (error) {
        console.error(error)
        formik.setFieldError("email", "Invalid credentials")
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
          {/* Your logo SVG */}
        </Link>

        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Admin Login 🔐
        </h1>

        <p className="mt-4 leading-relaxed text-gray-500">
          Secure access to library administration portal.
        </p>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="mt-8 grid grid-cols-6 gap-6"
      >
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
            placeholder="admin@admin.university.ac.id"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        <div className="col-span-6">
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

        <div className="col-span-6 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>

          <Link
            href="/admin/auth/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            {formik.isSubmitting ? "Signing in..." : "Sign in as Admin"}
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Not registered yet?{" "}
            <Link
              href="/admin/auth/register"
              className="text-blue-600 hover:underline"
            >
              Create an admin account
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
