'use client'

import { ProductType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"

interface AddToOrderButtonProps {
    product: ProductType
}

export default function AddToOrderButton({ product }: AddToOrderButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleAddToOrder = async () => {
        setIsLoading(true)
        try {
            console.log('Adding to order:', product)
            await new Promise(resolve => setTimeout(resolve, 500))
        } catch (error) {
            console.error('Error adding to order:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleAddToOrder}
            disabled={isLoading}
            className="w-full mt-4"
            variant="outline"
        >
            <ShoppingBag className="mr-2 h-4 w-4" />
            {isLoading ? 'Adding...' : 'Add to Order'}
        </Button>
    )
} 