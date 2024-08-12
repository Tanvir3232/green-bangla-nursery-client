import { useGetProductsQuery } from "@/redux/api/api";
import { TProduct } from "../product/ProductList";

const Gallery = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery({});
    if (isLoading) return "Loading";
    if (isError) return "Error loading products";

    return (
        <div className="my-6 mx-4 lg:mx-12">
            <h1 className="text-4xl my-5 font-bold text-center text-[#083214]">Gallery</h1>
            <div className="grid grid-cols-6 gap-2 rounded-xl overflow-hidden">
                {
                    products?.data.map((product: TProduct, index: number) => {
                        const spanClass = index % 3 === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1';
                        return (
                            <figure className={`${spanClass}   transform transition-transform shadow-md duration-200 hover:scale-105`} key={product._id}>
                                <img src={product.image} className="w-full h-full object-cover" alt={product.title} />
                            </figure>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Gallery;
