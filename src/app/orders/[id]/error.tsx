'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <p className="text-gray-500 mb-8 text-center">
                We couldn&apos;t load the order details. Please try again.
            </p>
            <div className="flex gap-4">
                <Button onClick={reset}>Try again</Button>
                <Link href="/orders">
                    <Button variant="outline">Go back to Orders</Button>
                </Link>
            </div>
        </div>
    )
} 