import Link from "next/link";
import { ShoppingCart, Package } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
            Welcome
          </h1>
          <p className="text-gray-500 dark:text-gray-400 md:text-xl">
            Explore our products and manage your orders
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto">
          <Link href="/products" className="group">
            <div className="relative p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex flex-col items-center">
                <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Products</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center text-xs sm:text-sm">
                  Browse our collection
                </p>
              </div>
            </div>
          </Link>

          <Link href="/orders" className="group">
            <div className="relative p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="flex flex-col items-center">
                <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-full mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500 dark:text-purple-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">Orders</h2>
                <p className="text-gray-500 dark:text-gray-400 text-center text-xs sm:text-sm">
                  View your orders
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
