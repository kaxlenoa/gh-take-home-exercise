'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
    const pathname = usePathname()

    // Don't render header on root path
    if (pathname === '/') {
        return null
    }

    const isActive = (path: string) => {
        return pathname === path ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"
    }

    return (
        <header className="border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold text-gray-900">GH</span>
                        </Link>
                    </div>
                    <nav className="flex space-x-8">
                        <Link
                            href="/products"
                            className={`${isActive('/products')} inline-flex items-center px-1 pt-1 text-sm`}
                        >
                            Products
                        </Link>
                        <Link
                            href="/orders"
                            className={`${isActive('/orders')} inline-flex items-center px-1 pt-1 text-sm`}
                        >
                            Orders
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
} 