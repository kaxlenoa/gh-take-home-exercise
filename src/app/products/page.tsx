import CategorySelector from "../components/CategorySelector";
import { getProducts, getCategories } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import AddToOrderButton from "../components/AddToOrderButton";
import { Pagination } from "../components/Pagination";

const ITEMS_PER_PAGE = 12;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default async function Page({ searchParams }) {
    const data = await getProducts();
    const categories = await getCategories();

    const currentPage = Number(searchParams.page) || 1;
    const categoryName = searchParams.category ? String(searchParams.category) : null;

    const filteredProducts = categoryName
        ? data.filter(product => product.category.name === categoryName)
        : data;

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-6 sm:mt-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8">
                <h1 className="text-2xl font-bold">Products</h1>
                <CategorySelector categories={categories} />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
                {paginatedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg p-3 sm:p-4 shadow hover:shadow-md transition-shadow bg-white"
                    >
                        <h2 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2 text-sm sm:text-base">{formatCurrency(product.price)}</p>
                        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                            Category: {product.category.name}
                        </p>
                        <AddToOrderButton product={product} />
                    </div>
                ))}
            </div>

            {paginatedProducts.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                    No products found in this category
                </div>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </div>
    );
}

