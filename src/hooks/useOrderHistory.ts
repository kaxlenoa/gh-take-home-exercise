'use client'

import { useState } from 'react'
import { OrderHistory } from '@/lib/types'

export function useOrderHistory() {
    const [orderHistory, setOrderHistory] = useState<OrderHistory[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('orderHistory')
            return saved ? JSON.parse(saved) : []
        }
        return []
    })

    const addToHistory = (order: OrderHistory) => {
        setOrderHistory(current => {
            const newHistory = [order, ...current]
            localStorage.setItem('orderHistory', JSON.stringify(newHistory))
            return newHistory
        })
    }

    const clearHistory = () => {
        localStorage.removeItem('orderHistory')
        setOrderHistory([])
    }

    return {
        orderHistory,
        addToHistory,
        clearHistory
    }
} 