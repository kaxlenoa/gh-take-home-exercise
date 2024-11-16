'use client'

import {OrderItemType, OrderUpdateType} from "@/lib/types"
import { useOrder } from "@/context/OrderContext"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import {updateOrder} from "@/lib/api";

interface OrderItemCardProps {
    item: OrderItemType
    status: string
    orderId: number
}

export function OrderItemCard({ item, orderId,  status }: OrderItemCardProps) {
    const { updateQuantity, removeItem } = useOrder()
    const [isProcessing, setIsProcessing] = useState(false)


    const handleQuantityChange = async (newQuantity: number) => {
        if (newQuantity < 1) {
        //   await handleRemoveItem()
        }

        const data = {
            action: "update_quantity",
            productId: item.product.id,
            quantity: newQuantity
        };


        try {
            setIsProcessing(true)
            await updateQuantity(item.product.id, newQuantity);
            await updateOrder(orderId, data as OrderUpdateType)
        } catch (error) {
            console.error('Failed to update quantity:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    const handleRemoveItem = async () => {
        try {
            setIsProcessing(true)
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
                <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                <p className="text-gray-700">{formatCurrency(item.product.price)}</p>
            </div>

            {status === 'PURCHASED' ? null : (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            disabled={isProcessing || item.quantity <= 1}
                            className="h-8 w-8"
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            disabled={isProcessing}
                            className="h-8 w-8"
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