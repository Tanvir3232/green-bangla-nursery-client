import { useGetProductsQuery } from "@/redux/api/api";
import { selectAllCategories } from "@/redux/features/categorySlice";
import { selectSelectedCategories, selectSort, setSort, toggleCategory } from "@/redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const categories = useAppSelector(selectAllCategories);
    const sort = useAppSelector(selectSort);
    const selectedCategories = useAppSelector(selectSelectedCategories);
    const dispatch = useAppDispatch();
    const { data: products, isLoading, isError } = useGetProductsQuery();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading products</p>;

    const filteredProducts = products?.data
        ?.filter(product => selectedCategories.length === 0 || selectedCategories.includes(product.category))
        .sort((a, b) => {
            if (sort === 'low') return a.price - b.price;
            if (sort === 'high') return b.price - a.price;
            return 0;
        });

    return (
        <section className="my-12 mx-4 lg:mx-12">
            <h1 className="text-4xl font-bold text-center text-[#083214]">Products</h1>
            <div className="flex justify-between items-center mt-5">
                <h1 className="text-xl font-semibold text-[#083214]">Filter by Categories</h1>
                <div className="text-xl font-semibold text-center text-[#083214]">
                    <Select onValueChange={(value) => dispatch(setSort(value))}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>

                                <SelectItem value="default">Default</SelectItem>
                                <SelectItem value="low">Low to high</SelectItem>
                                <SelectItem value="high">High to Low</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row items-start justify-between mt-5">
                <ul className="grid w-full lg:w-1/5 lg:grid-cols-1 grid-cols-3 space-y-2 text-xl">
                    {categories.map(category => (
                        <li key={category.name} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name={category.name}
                                checked={selectedCategories.includes(category.name)}
                                onChange={() => dispatch(toggleCategory(category.name))}
                            />
                            <label htmlFor={category.name} className="cursor-pointer">{category.name}</label>
                        </li>
                    ))}
                </ul>
                <div className="grid w-full lg:w-4/5 lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-2 mt-5">
                    {filteredProducts.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductList;
