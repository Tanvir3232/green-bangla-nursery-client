import ProductContainer from "@/components/product/ProuductContainer";
import { Helmet } from "react-helmet";

const Products = () => {
    return (
        <div>
            <Helmet>
                <title>Products | GB Nursery</title>
            </Helmet>
            <ProductContainer />
        </div>
    )
}
export default Products;