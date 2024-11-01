'use client'

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface PaginationProps {
    currentPage: number
    totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', newPage.toString())
        router.push(`/products?${params.toString()}`)
    }

    if (totalPages <= 1) return null

    return (
        <div className="mt-8 flex justify-center items-center gap-4">
            <Button
                variant="outline"
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
            </Button>

            <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
            </span>

            <Button
                variant="outline"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
        </div>
    )
} 