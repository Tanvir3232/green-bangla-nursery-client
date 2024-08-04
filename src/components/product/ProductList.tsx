import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {


    return (
        <div className="grid w-full lg:w-4/5 lg:grid-cols-4 gap-6 md:grid-cols-3 my-2 sm:grid-cols-2 ">
            {products?.length > 0 ? products.map(product => (
                <ProductCard key={product?._id} product={product} />
            ))
                : "No data found"}
        </div>
    );
}

export default ProductList;
