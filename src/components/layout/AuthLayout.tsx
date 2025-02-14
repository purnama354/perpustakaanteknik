"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith("/admin")

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="Library"
            src={
              isAdminRoute
                ? "https://images.unsplash.com/photo-1481627834876-b7833e8f5570"
                : "https://images.unsplash.com/photo-1507842217343-583bb7270b66"
            }
            width={1920}
            height={1080}
            priority
            quality={100}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <Link href="/" className="block text-white">
              <span className="sr-only">Home</span>
              {/* Your logo SVG */}
            </Link>

            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {isAdminRoute
                ? "Admin Portal - University Library 🔐"
                : "Welcome to University Library 📚"}
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              {isAdminRoute
                ? "Secure administrative access for managing library resources and user accounts."
                : "Access thousands of books and resources. Manage your library activities efficiently."}
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          {children}
        </main>
      </div>
    </section>
  )
}
