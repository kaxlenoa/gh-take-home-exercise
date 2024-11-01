'use client'

import { Button } from "@/components/ui/button"
import { useOrder } from "@/context/OrderContext"
import { ProductType } from "@/lib/types"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { useState } from "react"

interface AddToOrderButtonProps {
    product: ProductType
}

export default function AddToOrderButton({ product }: AddToOrderButtonProps) {
    const { items, addItem, updateQuantity } = useOrder()
    const [isAdding, setIsAdding] = useState(false)
    const [selectedQuantity, setSelectedQuantity] = useState(1)

    const existingItem = items.find(item => item.product?.id === product?.id)
    const quantityInOrder = existingItem?.quantity || 0

    const handleAdd = () => {
        setIsAdding(true)
        try {
            if (existingItem) {
                updateQuantity(product.id, quantityInOrder + selectedQuantity)
            } else {
                addItem(product, selectedQuantity)
            }
            setSelectedQuantity(1) // Reset selected quantity after adding
        } finally {
            setIsAdding(false)
        }
    }

    const handleIncreaseQuantity = () => {
        setSelectedQuantity(prev => prev + 1)
    }

    const handleDecreaseQuantity = () => {
        setSelectedQuantity(prev => Math.max(1, prev - 1))
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between border rounded-md p-1">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleDecreaseQuantity}
                    className="h-8 w-8"
                    aria-label="Decrease quantity"
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{selectedQuantity}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleIncreaseQuantity}
                    className="h-8 w-8"
                    aria-label="Increase quantity"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <Button
                onClick={handleAdd}
                disabled={isAdding}
                className="w-full"
            >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {isAdding ? 'Adding...' : quantityInOrder ? `Add More` : `Add to Order`}
            </Button>

            {quantityInOrder > 0 && (
                <p className="text-sm text-center text-gray-500">
                    {quantityInOrder} currently in order
                </p>
            )}
        </div>
    )
} 