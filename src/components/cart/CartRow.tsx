import { decrementQuantity, incrementQuantity, removeItem } from "@/redux/features/cartSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";

const CartRow = ({ product }) => {
    const { image, quantity, title, totalPrice, price, stock } = product;
    const dispatch = useDispatch();
    const [orderQuantity, setOrderQuantity] = useState(quantity);

    useEffect(() => {
        setOrderQuantity(quantity);
    }, [quantity]);

    const handleIncrement = () => {
        if (orderQuantity < stock) {
            dispatch(incrementQuantity(product));
            setOrderQuantity(orderQuantity + 1);
        }
    };

    const handleDecrement = () => {
        if (orderQuantity > 1) {
            dispatch(decrementQuantity(product));
            setOrderQuantity(orderQuantity - 1);
        }
    };
    const handleRemoveItem = () => {
        dispatch(removeItem(product));
        toast.success("Product item successfully deleted from cart", {
            duration: 2000,
            position: 'top-right',
        })
    }
    return (
        <div className="flex items-center gap-2 justify-between border border-gray-300 p-4 rounded-lg shadow-md">
            <figure className="w-24 h-20 rounded-md overflow-hidden">
                <img src={image} className="object-cover w-full h-full" alt={title} />
            </figure>
            <div className="flex flex-col flex-1 ml-4">
                <h1 className="text-lg font-semibold text-gray-700">{title}</h1>
                <p className="text-sm text-gray-500"><strong>Price:</strong> ${price.toFixed(2)}</p>

                <p className="text-sm text-gray-500"><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleDecrement}
                    className={`bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 ${orderQuantity === 1 ? 'cursor-not-allowed' : ''}`}
                    disabled={orderQuantity === 1}
                >
                    -
                </button>
                <span className="text-lg font-medium">{orderQuantity}</span>
                <button
                    onClick={handleIncrement}
                    className={`bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300 ${orderQuantity >= stock ? 'cursor-not-allowed' : ''}`}
                    disabled={orderQuantity >= stock}
                >
                    +
                </button>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleRemoveItem}
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 flex items-center"
                >
                    <FaTrash className="size-5" />
                </button>
            </div>
        </div>
    );
};

export default CartRow;
