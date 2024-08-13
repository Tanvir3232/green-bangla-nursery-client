import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Helmet } from "react-helmet";

const Checkout = () => {
    return (
        <div>
            <Helmet>
                <title>Checkout | GB Nursery</title>
            </Helmet>
            <CheckoutForm />
        </div>
    )
}
export default Checkout;