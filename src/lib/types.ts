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

export type CategoryType = {
    order: number;
    name: string;
} 