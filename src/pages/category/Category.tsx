import PriceSortFilter from "@/components/product/PriceSortFilter";
import ProductList from "@/components/product/ProductList";
import { useGetProductsQuery } from "@/redux/api/api";
import { selectAllCategories } from "@/redux/features/categorySlice";
import { selectSort } from "@/redux/features/filterSlice";
import { useAppSelector } from "@/redux/hooks";
import { useParams } from "react-router-dom";

const Category = () => {
    const { category } = useParams();
    const categories = useAppSelector(selectAllCategories);
    const sort = useAppSelector(selectSort);
    const categoryData = categories.find(item => item.name == category);
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const filteredProducts = products?.data.filter(item => item.category === category)
        .sort((a, b) => {
            if (sort === 'low') return a.price - b.price;
            if (sort === 'high') return b.price - a.price;
            return 0;
        });
    console.log(filteredProducts)
    return (
        <div className="w-full ">
            <figure className="w-full relative bg-slate-700 h-full">
                <img
                    src='/category.png'
                    alt={categoryData.name}
                    className="object-cover w-full  h-full opacity-40"
                />
                <figcaption className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white md:text-4xl text-[12px] lg:text-5xl font-bold">{categoryData.name}</p>
                </figcaption>
            </figure>
            <section className="my-5 mx-4 lg:mx-12">
                <h1 className="text-4xl font-bold  text-center text-[#083214]">Products</h1>

                <div className="flex justify-end mt-2">
                    <PriceSortFilter />
                </div>
                {
                    isLoading ? "Fetching data..."
                        : <ProductList products={filteredProducts} />
                }
            </section>
        </div>
    )
}
export default Category;