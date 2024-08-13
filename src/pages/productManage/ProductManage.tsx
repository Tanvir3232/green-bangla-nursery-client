import AddProductModal from "@/components/product/AddProductModal";
import ProductTable from "@/components/product/ProductTable";
import { Helmet } from "react-helmet";

const ProductManage = () => {
    return (
        <div className="w-5/6 mx-auto my-5">

            <div >
                <Helmet>
                    <title>Product Management | GB Nursery</title>
                </Helmet>
                <AddProductModal />
                <ProductTable />
            </div>

        </div>
    )
}
export default ProductManage;