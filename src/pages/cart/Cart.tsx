import CartList from "@/components/cart/CartList";
import { Button } from "@/components/ui/button";
import { selectCartItems, selectCartTotalPrice } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const cartItems = useAppSelector(selectCartItems);
    const totalPrice = useAppSelector(selectCartTotalPrice);
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <div className="w-4/5 mx-auto my-5 border border-gray-200 shadow-sm p-5 rounded-md">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">All Cart Items</h1>
                <p className="text-mx font-semibold">Total Items: {cartItems.length}</p>
            </div>
            <CartList cartItems={cartItems} />
            <div className="flex justify-between items-center mt-6">
                <p className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
                <Button onClick={handleCheckout} className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    );
};

export default Cart;
