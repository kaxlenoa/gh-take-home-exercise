'use client'
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { purchaseOrder } from "@/lib/api"
import { toast } from 'sonner'

interface OrderTotalProps {
    orderId?: number
    showPurchaseButton?: boolean
    onUpdate?: () => Promise<void>
    total: number
}

export default function OrderTotal({
    orderId,
    showPurchaseButton = false,
    total
}: OrderTotalProps) {
    const [isPurchasing, setIsPurchasing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handlePurchase = async () => {
        if (!orderId) return
        setError(null)

        try {
            setIsPurchasing(true)
            await purchaseOrder(orderId)

        } catch (error) {
            console.error('Failed to purchase order:', error)
            setError('Failed to complete purchase. Please try again.')
            toast.error('Failed to complete purchase', {
                description: 'Please try again later.',
            })
        } finally {
            setIsPurchasing(false)
            toast.success(`Order #${orderId} has been successfully purchased!`, {
                duration: 3000,
            })
        }
    }

    return (
        <div className="mt-6 pt-6 border-t">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">{formatCurrency(total)}</span>
                </div>
                {showPurchaseButton && (
                    <div className="flex flex-col items-end">
                        {error && (
                            <p className="text-sm text-red-600 mb-2">{error}</p>
                        )}
                        <Button
                            onClick={handlePurchase}
                            disabled={isPurchasing || total === 0}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            {isPurchasing ? 'Processing...' : 'Purchase Order'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
} 