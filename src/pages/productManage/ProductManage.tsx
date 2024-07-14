import ProductTable from "@/components/product/ProductTable";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";

const ProductManage = () => {
    return (
        <div className="w-5/6 mx-auto my-5">

            <div >
                <Button> <FaPlus className=" size-5 mr-2" /> Add Proudct</Button>
                <ProductTable />
            </div>

        </div>
    )
}
export default ProductManage;