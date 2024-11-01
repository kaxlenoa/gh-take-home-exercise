'use client'

import { OrderItemType, OrderUpdateType } from "@/lib/types"
import { updateOrder } from "@/lib/api"
import { useOrder } from "@/context/OrderContext"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useState } from "react"

interface OrderItemCardProps {
    item: OrderItemType
    orderId: number
    status: string
}

export function OrderItemCard({ item, orderId, status }: OrderItemCardProps) {
    const { removeItem } = useOrder()
    const [isProcessing, setIsProcessing] = useState(false)
    const [selectedQuantity, setSelectedQuantity] = useState(item.quantity)

    const handleUpdateQuantity = async (newQuantity: number) => {
        if (newQuantity < 1) return
        setIsProcessing(true)

        const data = {
            action: "update_quantity",
            productId: item.product.id,
            quantity: newQuantity
        };

        try {
            await updateOrder(orderId, data as OrderUpdateType)
            setSelectedQuantity(newQuantity)
        } catch (error) {
            console.error('Failed to update quantity:', error)
            setSelectedQuantity(item.quantity)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleRemoveItem = async () => {
        setIsProcessing(true)
        try {
            await removeItem(item.product.id)
        } catch (error) {
            console.error('Failed to remove item:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-500 text-sm">Category: {item.product.category.name}</p>
                {status === 'PURCHASED' && <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>}
                <p className="text-gray-700">{formatCurrency(item.product.price)}</p>
            </div>

            {status === 'PURCHASED' ? null : (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateQuantity(selectedQuantity - 1)}
                            className="h-8 w-8"
                            disabled={isProcessing || selectedQuantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{selectedQuantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateQuantity(selectedQuantity + 1)}
                            className="h-8 w-8"
                            disabled={isProcessing}
                            aria-label="Increase quantity"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveItem}
                        disabled={isProcessing}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    )
} 