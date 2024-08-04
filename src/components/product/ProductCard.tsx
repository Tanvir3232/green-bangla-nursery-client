import { addItem } from "@/redux/features/cartSlice";
import { Rating } from "@smastrom/react-rating";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "../ui/button";

interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    quantity?: number;
    totalPrice?: number;
    image: string;
    title: string;
    rating: number;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(addItem(product));
        Swal.fire({
            icon: 'success',
            title: 'Product Added to Cart!',
            text: 'Your product has been successfully added to Cart.',
            confirmButtonText: 'OK',
        });
    };

    const { title, price, rating, image, _id } = product;

    return (
        <Link to={`/products/${_id}`} className="lg:h-[300px] md:h-[300px] h-[400px] border border-slate-300 w-full rounded-md shadow-sm hover:shadow-lg p-3 overflow-hidden flex flex-col justify-between">
            <figure className=" w-full h-full lg:h-36 rounded-md overflow-hidden">
                <img className="object-cover w-full h-full" src={image} alt={title} />
            </figure>
            <div>
                <p><strong>Title:</strong> {title}</p>
                <p><strong>Price:</strong> {price}</p>
                <div className="flex items-center gap-2">
                    <strong>Ratings:</strong>
                    <Rating className="size-5 max-w-32 text-yellow-500" readOnly value={rating} />
                </div>
            </div>
            <Button onClick={handleAddToCart} className="font-bold text-md">Add to Cart</Button>
        </Link>
    );
};

export default ProductCard;
