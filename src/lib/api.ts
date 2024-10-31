import { ProductType, CategoryType } from './types';

export async function getProducts(): Promise<ProductType[]> {
    try {
        const response = await fetch(`${process.env.BASE_URL}/products`)
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
        const response = await fetch(`${process.env.BASE_URL}/categories`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export async function getOrders(): Promise<CategoryType[]> {
    try {
        const response = await fetch(`${process.env.BASE_URL}/orders`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
} 