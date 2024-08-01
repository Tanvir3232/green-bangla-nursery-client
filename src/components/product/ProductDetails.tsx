import { useGetProductQuery } from "@/redux/api/api";

import { addItem } from "@/redux/features/cartSlice";
import { Rating } from "@smastrom/react-rating";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "../ui/button";
const ProductDetails = () => {
    const { id } = useParams();
    console.log(id)
    const dispatch = useDispatch();
    const { data: product, isLoading, isError } = useGetProductQuery(id);
    if (isLoading) {
        return "Loading..."
    }


    if (isError) return "some went wront"
    const { title, description, rating, price, image, category } = product.data;
    const handleAddToCart = (e) => {
        e.stopPropagation()
        e.preventDefault()
        dispatch(addItem(product.data))
        Swal.fire({
            icon: 'success',
            title: 'Product Added to Cart!',
            text: 'Your product has been successfully added to Cart.',
            confirmButtonText: 'OK',
        });
    }
    return (
        <div className="flex flex-col lg:flex-row md:flex-row justify-between p-2 gap-5 md:p-4  lg:p-5 md:mx-10 mx-2 lg:mx-12">
            <figure className="w-full md:w-1/2 lg:w-1/2 lg:h-[350px] md:h-[350px] h-full rounded-md overflow-hidden">
                <img src={image} className="object-cover w-full h-full" alt="" />
            </figure>
            <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col gap-3 px-5 justify-around">
                <h1 className="text-2xl font-bold">{title}</h1>
                <h2><strong>Category: </strong>{category}</h2>
                <p><strong>Description: </strong>{description}</p>
                <p><strong>Price:</strong> {price}</p>
                <p className="flex items-center gap-3"> <strong>Rating: </strong> <Rating className="size-6 max-w-48 text-yellow-500" readOnly value={rating} /> </p>
                <Button onClick={handleAddToCart} className="font-bold text-md w-40 hover:bg-slate-800">Add to Cart</Button>

            </div>
        </div>
    )
}
export default ProductDetails;