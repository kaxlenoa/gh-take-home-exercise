import { ReactNode } from "react";
import CategorySelector from "../components/CategorySelector";
import AddToOrderButton from "../components/AddToOrderButton";
import { getProducts, getCategories } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: PageProps): Promise<ReactNode> {
    const data = await getProducts();
    const categories = await getCategories();

    console.log(data, 'data')

    const categoryName = searchParams.category ? String(searchParams.category) : null;
    const filteredProducts = categoryName
        ? data.filter(product => product.category.name === categoryName)
        : data;

    const first100Products = filteredProducts.slice(0, 100);

    return (
        <div className="min-h-screen p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products</h1>
                <CategorySelector categories={categories} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {first100Products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow"
                    >
                        <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{formatCurrency(product.price)}</p>
                        <p className="text-sm text-gray-500 mb-2">
                            Category: {product.category.name}
                        </p>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                            {product.description}
                        </p>
                        <AddToOrderButton product={product} />
                    </div>
                ))}
            </div>
            {first100Products.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No products found in this category
                </div>
            )}
        </div>
    );
}

