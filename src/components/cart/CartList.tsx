import CartRow from "./CartRow";
export interface TCartProduct {
    _id: string;
    image: string;
    price: number;
    quantity?: number;
    stock: number;
    title: string;
    totalPrice?: number;
}

interface CartListProps {
    cartItems: TCartProduct[];
}
const CartList: React.FC<CartListProps> = ({ cartItems }) => {

    return (
        <div className="space-y-2 pt-3">
            {
                cartItems.length > 0
                    ? cartItems.map(item => <CartRow key={item._id} product={item} />)
                    : <p>No Items </p>
            }
        </div>
    )
}
export default CartList;