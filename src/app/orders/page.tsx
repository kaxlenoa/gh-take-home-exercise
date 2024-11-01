'use client'
import { useOrderHistory } from "@/hooks/useOrderHistory"
import Link from "next/link"

export default function OrdersPage() {
    const { orderHistory } = useOrderHistory()

    if (orderHistory.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold mb-4">No orders yet</h1>
                <p className="text-gray-500 mb-8">Start shopping to create your first order</p>
                <Link
                    href="/products"
                    className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                    Browse Products
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold mb-8">Order History</h1>
            <div className="space-y-4">
                {orderHistory.map((order) => (
                    <Link
                        href={`/orders/${order.id}`}
                        key={order.id}
                        className="block p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Order #{order.id}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}