import AddProductModal from "@/components/product/AddProductModal";
import ProductTable from "@/components/product/ProductTable";

const ProductManage = () => {
    return (
        <div className="w-5/6 mx-auto my-5">

            <div >
                <AddProductModal />
                <ProductTable />
            </div>

        </div>
    )
}
export default ProductManage;