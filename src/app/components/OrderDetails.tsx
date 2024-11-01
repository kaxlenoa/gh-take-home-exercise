'use client'

import { OrderItemType, InitialOrderType } from "@/lib/types"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { OrderItemCard } from "@/app/components/OrderItemCard"
import OrderTotal from "@/app/components/OrderTotal"
import { useState, useCallback } from "react"
import { getOrderById } from "@/lib/api"

interface OrderDetailsProps {
    initialOrder: InitialOrderType
}

export function OrderDetails({ initialOrder }: OrderDetailsProps) {

    const [order, setOrder] = useState<InitialOrderType>(initialOrder)

    const refreshOrder = useCallback(async () => {
        try {
            const updatedOrder = await getOrderById(order.id)
            setOrder(updatedOrder)
        } catch (error) {
            console.error('Failed to refresh order:', error)
        }
    }, [order.id])

    // Calculate total whenever order changes
    const orderTotal = order.products.reduce(
        (sum: number, item: OrderItemType) =>
            sum + (item?.product.price * item?.quantity),
        0
    )

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <Link
                    href="/orders"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Orders
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Order #{order.id}</h1>
                        <p className="text-sm text-gray-500">
                            Created at: {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </div>
                    <div className="px-3 py-1 rounded-full text-sm font-medium" style={{
                        backgroundColor: getStatusColor(order.status).bg,
                        color: getStatusColor(order.status).text
                    }}>
                        {order.status}
                    </div>
                </div>

                <div className="space-y-4">
                    {order.products.map((item: OrderItemType) => (
                        <OrderItemCard
                            key={item.product.id}
                            item={item}
                            orderId={order.id}
                            status={order.status}
                        />
                    ))}
                </div>

                <OrderTotal
                    orderId={order.id}
                    showPurchaseButton={order.status === 'CART'}
                    onUpdate={refreshOrder}
                    total={orderTotal}
                />
            </div>
        </div>
    )
}

function getStatusColor(status: string) {
    switch (status) {
        case 'CART':
            return { bg: '#FEF3C7', text: '#92400E' }
        case 'PENDING':
            return { bg: '#DBEAFE', text: '#1E40AF' }
        case 'COMPLETED':
            return { bg: '#D1FAE5', text: '#065F46' }
        case 'CANCELLED':
            return { bg: '#FEE2E2', text: '#991B1B' }
        default:
            return { bg: '#F3F4F6', text: '#374151' }
    }
} 