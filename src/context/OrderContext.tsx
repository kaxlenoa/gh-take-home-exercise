'use client'

import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { OrderContextType, OrderItemType, ProductType } from '@/lib/types'

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<OrderItemType[]>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('orderItems')
            return saved ? JSON.parse(saved) : []
        }
        return []
    })

    const addItem = useCallback((product: ProductType, quantity: number = 1) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.product.id === product?.id)

            const newItems = existingItem
                ? currentItems.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                )
                : [...currentItems, { product, quantity }]

            localStorage.setItem('orderItems', JSON.stringify(newItems))
            return newItems
        })
    }, [])

    const removeItem = useCallback((productId: number) => {
        setItems(currentItems => {
            const newItems = currentItems.filter(item => item.product.id !== productId)
            localStorage.setItem('orderItems', JSON.stringify(newItems))
            return newItems
        })
    }, [])

    const updateQuantity = useCallback((productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId)
            return
        }

        setItems(currentItems => {
            const newItems = currentItems.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
            localStorage.setItem('orderItems', JSON.stringify(newItems))
            return newItems
        })
    }, [removeItem])

    const clearOrder = useCallback(() => {
        localStorage.removeItem('orderItems')
        setItems([])
    }, [])

    const total = useMemo(() => {
        return items.reduce((sum, item) => sum + (item.product?.price * item.quantity), 0)
    }, [items])

    const value = {
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearOrder,
        total
    }

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}

export function useOrder() {
    const context = useContext(OrderContext)
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider')
    }
    return context
} 