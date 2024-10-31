'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CategoryType } from "@/lib/types";
import { useRouter, useSearchParams } from 'next/navigation'

interface CategorySelectorProps {
    categories: CategoryType[];
}

export default function CategorySelector({ categories }: CategorySelectorProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleValueChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value === "all") {
            params.delete("category")
        } else {
            params.set("category", value)
        }
        router.push(`/products?${params.toString()}`)
    }

    return (
        <Select onValueChange={handleValueChange} defaultValue={searchParams.get("category") || "all"}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                    <SelectItem key={category.order} value={category.name}>
                        {category.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
} 