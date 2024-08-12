import { Pagination } from "antd";
import { useState } from "react";
import ProductCard from "./ProductCard";
export type TProduct = {
    _id: string;
    category: string;
    createdAt: string;
    description: string;
    image: string;
    price: number;
    rating: number;
    stock: number;
    title: string;

}

interface ProductListProps {
    products: TProduct[];
}
const ProductList: React.FC<ProductListProps> = ({ products }) => {
    console.log("Products", products)
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // You can change this to the desired page size

    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    // Calculate the index of the first and last product on the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return (
        <div>
            <div className=" grid w-full  lg:grid-cols-4 gap-6 md:grid-cols-3 my-2 sm:grid-cols-2 ">
                {paginatedProducts.length > 0 ? paginatedProducts.map(product => (
                    <ProductCard key={product?._id} product={product} />
                ))
                    : <p className="text-red-400 font-semibold text-xl text-center">No data found</p>}
            </div>
            {
                paginatedProducts.length > 0 &&
                <div className="flex justify-center mt-4">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={products.length}
                        onChange={handlePageChange}
                    />
                </div>
            }
        </div>
    );
}

export default ProductList;
