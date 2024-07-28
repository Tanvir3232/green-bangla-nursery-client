import { useGetProductsQuery } from "@/redux/api/api";
import { selectAllCategories } from "@/redux/features/categorySlice";
import { useAppSelector } from "@/redux/hooks";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const categories = useAppSelector(selectAllCategories);
    const { data: products, isLoading, isError } = useGetProductsQuery();
    return (
        <section className="my-12  lg:mx-12">
            <h1 className="text-4xl font-bold text-center text-[#083214]">Products</h1>
            <div className="flex justify-between items-center mt-5">

                <h1 className="text-xl font-semibold text-[#083214]">Filter by Categories</h1>
                <div className="text-xl font-semibold text-center text-[#083214]">

                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by price" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>default</SelectLabel>
                                <SelectItem value="low">Low to high</SelectItem>
                                <SelectItem value="high">High to Low</SelectItem>

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>


            <div className="flex justify-between">


                <ul className="space-y-2 mt-4 text-xl" >
                    {
                        categories.map(category =>
                            <div key={category.name} className="flex gap-2 items-center">
                                <input type="checkbox" name={category.name} id="" />
                                <li className="cursor-pointer" > {category.name}</li>
                            </div>
                        )
                    }
                </ul>

                <div className="grid lg:grid-cols-4 gap-6 md:grid-cols-3 sm:grid-cols-2">
                    {
                        products?.data?.map(product => <ProductCard key={product._id} product={product} />)
                    }
                </div>

            </div>



        </section>

    )
}
export default ProductList;