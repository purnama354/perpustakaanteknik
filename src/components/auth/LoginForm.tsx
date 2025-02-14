"use client"

import { useFormik } from "formik"
import { loginSchema } from "@/lib/validationSchemas"
import Link from "next/link"
import { LoginValues } from "@/interfaces/auth/auth"
import { useRouter } from "next/navigation"
import { adminAuth } from "@/lib/admin/adminAuth"

export const LoginForm = () => {
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
        router.push("/dashboard")
      } catch (error: Unknown) {
        console.error(error)
        formik.setErrors({
          email: "Invalid credentials",
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
          {/* Your logo SVG */}
        </Link>

        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
          Welcome Back 👋
        </h1>
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
            Email
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

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
          >
            {formik.isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Don&apos;t have an account?
            <Link
              href="/register"
              className="text-gray-700 underline hover:text-blue-600"
            >
              {" "}
              Register
            </Link>
            .
          </p>
        </div>

        <div className="col-span-6 text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 underline"
          >
            Forgot your password?
          </Link>
        </div>
      </form>
    </div>
  )
}
