import { selectAllCategories } from "@/redux/features/categorySlice";
import { useAppSelector } from "@/redux/hooks";

const ProductList = () => {
    const categories = useAppSelector(selectAllCategories);
    return (
        <div className="my-8 lg:mx-12">
            <h1 className="text-4xl font-bold text-center text-[#083214]">Products</h1>
            <div className="flex justify-between ">
                <div>
                    <h1 className="text-xl font-semibold text-[#083214]">Filter by Categories</h1>
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

                </div>
                <div className="text-xl font-semibold text-center text-[#083214]">
                    Sort by:
                </div>
            </div>
        </div>
    )
}
export default ProductList;