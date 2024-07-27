import { selectAllCategories } from "@/redux/features/categorySlice";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";

const Categories = () => {
    const categories = useAppSelector(selectAllCategories);
    console.log("From Categories Component:", categories);

    return (
        <div className="my-8 lg:mx-12 mx-4">
            <h1 className="text-4xl font-bold text-center text-[#083214]">Categories</h1>
            <ul className="flex justify-between items-center mt-5 space-x-4">
                {categories.map((category, index) => (
                    <Link to={`/categories/${category.name}`} key={index} className="relative cursor-pointer flex flex-col lg:flex-row  items-center justify-center rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
                        <figure className="w-full h-full">
                            <img
                                src={category.icon}
                                alt={category.name}
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-black opacity-50 hover:opacity-60 transition-opacity duration-300"></div>
                            <figcaption className="absolute inset-0 flex items-center justify-center">
                                <p className="text-white md:text-md text-[12px] lg:text-xl font-bold">{category.name}</p>
                            </figcaption>
                        </figure>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default Categories;
