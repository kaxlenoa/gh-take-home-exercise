import {ProductType, CategoryType, Order, OrderUpdateType, InitialOrderType} from './types';

const BASE_URL = 'https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api';

export async function getProducts(): Promise<ProductType[]> {
    try {
        const response = await fetch(`${BASE_URL}/products`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getCategories(): Promise<CategoryType[]> {
    try {
        const response = await fetch(`${BASE_URL}/categories`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}


export async function createOrder(orderData: {
    products: { quantity: number; id: number | undefined }[]
}): Promise<Order> {
    try {
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

export async function getOrderById(id: number): Promise<InitialOrderType> {
    try {
        const response = await fetch(`${BASE_URL}/orders/${id}`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
}


export async function updateOrder(orderId: number, orderData: OrderUpdateType) {
    try {
        const response = await fetch(`${BASE_URL}/orders/${orderId}?norandom`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating order:', error);
        throw error;
    }
}

export async function purchaseOrder(orderId: number): Promise<Order | null> {
    try {
        const response = await fetch(`${BASE_URL}/orders/${orderId}/buy/?norandom`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Purchase failed:', errorText);
            throw new Error(`Purchase failed: ${response.status}`);
        }

        // Check if there's actually a response body
        const text = await response.text();
        if (!text) {
            // If no response body, consider it a success but return null
            return null;
        }

        try {
            // Try to parse as JSON if there is a response body
            return JSON.parse(text);
        } catch (e) {
            console.error('Failed to parse response:', e);
            // If parsing fails but request was successful, return null
            return null;
        }
    } catch (error) {
        console.error('Error purchasing order:', error);
        throw error;
    }
}