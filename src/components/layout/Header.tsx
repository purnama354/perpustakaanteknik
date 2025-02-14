import { useAuthStore } from "@/store/authStore"
import Link from "next/link"
import { Button } from "../ui/Button"

export const Header = () => {
  const { user, role } = useAuthStore()

  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl">
            Library System
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/books" className="hover:text-blue-600">
              Books
            </Link>
            {user ? (
              <>
                <Link
                  href={`/${role}/dashboard`}
                  className="hover:text-blue-600"
                >
                  Dashboard
                </Link>
                <Button variant="outline" size="sm">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
