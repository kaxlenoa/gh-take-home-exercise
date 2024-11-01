import { ProductType } from './types'

export const sampleProducts: ProductType[] = [
    {
        id: 1,
        name: "Espresso Machine",
        description: "Professional-grade espresso machine for perfect coffee every time",
        price: 599.99,
        image: "https://example.com/espresso-machine.jpg",
        category: {
            name: "Coffee Equipment",
            order: 1
        }
    },
    {
        id: 2,
        name: "Coffee Grinder",
        description: "Burr grinder with multiple settings for precise grinding",
        price: 199.99,
        image: "https://example.com/coffee-grinder.jpg",
        category: {
            name: "Coffee Equipment",
            order: 1
        }
    },
    {
        id: 3,
        name: "Pour Over Kit",
        description: "Complete kit for manual pour-over coffee brewing",
        price: 49.99,
        image: "https://example.com/pour-over-kit.jpg",
        category: {
            name: "Brewing Tools",
            order: 2
        }
    },
    {
        id: 4,
        name: "Colombian Coffee Beans",
        description: "Premium single-origin Colombian coffee beans",
        price: 24.99,
        image: "https://example.com/colombian-coffee.jpg",
        category: {
            name: "Coffee Beans",
            order: 3
        }
    },
    {
        id: 5,
        name: "Ethiopian Coffee Beans",
        description: "Organic Ethiopian Yirgacheffe coffee beans",
        price: 29.99,
        image: "https://example.com/ethiopian-coffee.jpg",
        category: {
            name: "Coffee Beans",
            order: 3
        }
    }
]

// Sample categories based on the products above
export const sampleCategories = [
    {
        name: "Coffee Equipment",
        order: 1
    },
    {
        name: "Brewing Tools",
        order: 2
    },
    {
        name: "Coffee Beans",
        order: 3
    }
]

// Sample order with these products
export const sampleOrder = {
    id: 1,
    createdAt: new Date().toISOString(),
    status: "CART",
    products: [
        {
            product: sampleProducts[0],
            quantity: 1
        },
        {
            product: sampleProducts[3],
            quantity: 2
        }
    ]
} 