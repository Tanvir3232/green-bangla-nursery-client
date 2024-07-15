import { useGetProductsQuery, useRemoveProductMutation } from "@/redux/api/api";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const ProductTable = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery();
    const [removeProduct] = useRemoveProductMutation();
    console.log(products?.data);

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                removeProduct(id);
                Swal.fire({
                    title: "Deleted!",
                    text: "Product has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    if (isLoading) {
        return <p>Loading...</p>
    }
    if (isError) {
        return <p>Something went wrong</p>
    }
    return (
        <>
            {
                products?.data?.length == 0
                    ? <div className="text-center border p-5 rounded-md my-3 text-red-400 font-semibold text-xl">
                        No Products Found
                    </div>
                    : <Table>

                        <TableHeader>

                            <TableRow>
                                <TableHead >Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products?.data?.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell className="font-medium">{product.title}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell className="text-right">{product.price}</TableCell>
                                    <TableCell className="flex gap-3">
                                        <Button onClick={() => handleDeleteProduct(product._id)} variant="outline" className="hover:bg-red-500 px-3 hover:text-gray-100 border-red-500">
                                            <FaRegTrashCan className="size-5" />
                                        </Button>
                                        <Button variant="outline" className="hover:bg-blue-500 px-3 hover:text-gray-100 border-blue-500">
                                            <FaPenToSquare className="size-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
            }

        </>
    )
}

export default ProductTable;