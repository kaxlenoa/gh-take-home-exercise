'use client'
import { useOrderHistory } from "@/hooks/useOrderHistory"
import { useOrder } from "@/context/OrderContext"
import { useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { createOrder } from "@/lib/api"

export default function OrderSummary() {
    const { items, total, clearOrder } = useOrder()
    const itemCount = items.reduce((sum, item) => sum + item?.quantity, 0)
    const router = useRouter()
    const { addToHistory } = useOrderHistory()

    const handleCheckout = async () => {
        try {
            const orderData = {
                products: items.map(item => ({
                    quantity: item.quantity,
                    id: item?.product?.id
                }))
            }

            const createdOrder = await createOrder(orderData)
            console.log(createdOrder, 'createdOrder')
            clearOrder()
            addToHistory(createdOrder)
            router.push(`/cart/${createdOrder.id}`)
        } catch (error) {
            console.error('Error creating order:', error)
        }
    }

    if (itemCount === 0) return null

    return (
        <div
            onClick={handleCheckout}
            className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-full 
                      shadow-lg flex items-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer"
        >
            <ShoppingBag className="h-5 w-5" />
            <span>{itemCount} items</span>
            <span className="font-bold">{formatCurrency(total)}</span>
        </div>
    )
} 