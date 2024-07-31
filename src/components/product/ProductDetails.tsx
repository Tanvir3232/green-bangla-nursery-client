import { useGetProductQuery } from "@/redux/api/api";

import { Rating } from "@smastrom/react-rating";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
const ProductDetails = () => {
    const { id } = useParams();
    console.log(id)
    const { data: product, isLoading, isError } = useGetProductQuery(id);
    if (isLoading) {
        return "Loading..."
    }
    const { title, description, rating, price, image, category } = product.data;
    return (
        <div className="flex justify-between p-5 mx-12">
            <figure className="w-1/2 h-[350px] rounded-md overflow-hidden">
                <img src={image} className="object-cover w-full h-full" alt="" />
            </figure>
            <div className="w-1/2 flex flex-col px-5 justify-around">
                <h1 className="text-2xl font-bold">{title}</h1>
                <h2><strong>Category: </strong>{category}</h2>
                <p><strong>Category: </strong>{description}</p>
                <p><strong>Price:</strong> {price}</p>
                <p className="flex items-center gap-3"> <strong>Rating: </strong> <Rating className="size-6 max-w-48 text-yellow-500" readOnly value={rating} /> </p>
                <Button className="font-bold text-md w-40 hover:bg-slate-800">Add to Cart</Button>

            </div>
        </div>
    )
}
export default ProductDetails;