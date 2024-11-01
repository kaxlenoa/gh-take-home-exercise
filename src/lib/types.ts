export type ProductType = {
    description: string;
    id: number;
    image: string;
    price: number;
    name: string;
    category: {
        name: string;
        order: number
    };
}

export type InitialOrderType = {
    createdAt: string,
    id: number,
    products: OrderItemType[],
    status: string
}

export type CategoryType = {
    order: number;
    name: string;
}

export type OrderItemType = {
    product: ProductType;
    quantity: number;
    id?: number;
}

export type OrderHistory = {
    product?: ProductType;
    quantity?: number;
    id?: number;
}

export type OrderContextType = {
    items: OrderItemType[];
    addItem: (product: ProductType, quantity?: number) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearOrder: () => void;
    total: number;
}

export type Order = {
    id: number
    products: {
        id: number
        quantity: number
        price: number
        name: string
    }[]
    total: number
    createdAt: string
}

export type OrderUpdateType = {
    action: 'update_quantity';
    productId: number;
    quantity: number;
}