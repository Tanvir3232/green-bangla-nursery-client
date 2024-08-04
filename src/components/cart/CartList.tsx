import CartRow from "./CartRow";

const CartList = ({ cartItems }) => {

    return (
        <div className="space-y-2">
            {
                cartItems.length > 0
                    ? cartItems.map(item => <CartRow key={item._id} product={item} />)
                    : <p>No Items </p>
            }
        </div>
    )
}
export default CartList;