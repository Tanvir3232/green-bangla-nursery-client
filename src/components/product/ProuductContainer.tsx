import { useGetProductsQuery } from "@/redux/api/api";
import { selectAllCategories } from "@/redux/features/categorySlice";
import { selectSelectedCategories, selectSort, toggleCategory } from "@/redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Input } from 'antd';

import { selectSearchTerm, setSearchTerm } from "@/redux/features/searchSlice";
import PriceSortFilter from "./PriceSortFilter";
import ProductList from "./ProductList";
const { Search } = Input;
const ProductContainer = () => {
    const categories = useAppSelector(selectAllCategories);
    const sort = useAppSelector(selectSort);
    const selectedCategories = useAppSelector(selectSelectedCategories);
    const dispatch = useAppDispatch();

    const searchTerm = useAppSelector(selectSearchTerm);
    const { data: products, isLoading, isError } = useGetProductsQuery();

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading products</p>;

    const filteredProducts = products?.data
        ?.filter(product => selectedCategories.length === 0 || selectedCategories.includes(product.category))
        .filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sort === 'low') return a.price - b.price;
            if (sort === 'high') return b.price - a.price;
            return 0;
        });
    const handleSearchChange = (value) => {
        dispatch(setSearchTerm(value));
    };

    return (
        <section className="my-12 mx-4 lg:mx-12">
            <h1 className="text-4xl font-bold text-center text-[#083214]">Products</h1>

            <div className="flex flex-col-reverse lg:flex-row md:flex-row justify-between gap-5 items-center mt-5">
                <h1 className="text-xl font-semibold text-[#083214]">Filter by Categories</h1>
                <Search onSearch={handleSearchChange} className="lg:w-3/5 md:3/5 w-4/5" placeholder="enter a tree name" size="large" enterButton allowClear />
                <PriceSortFilter />
            </div>
            <div className="flex flex-col lg:flex-row items-start justify-between mt-5">
                <ul className="grid w-full lg:w-1/5 lg:grid-cols-1 grid-cols-3 space-y-2 text-xl">
                    {categories.map(category => (
                        <li key={category.name} className="flex items-center gap-2">
                            <input
                                className="cursor-pointer"
                                type="checkbox"
                                name={category.name}
                                checked={selectedCategories.includes(category.name)}
                                onChange={() => dispatch(toggleCategory(category.name))}
                            />
                            <label htmlFor={category.name} className="cursor-pointer">{category.name}</label>
                        </li>
                    ))}
                </ul>
                <ProductList products={filteredProducts} />
            </div>
        </section>
    )
}
export default ProductContainer;