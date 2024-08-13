import { useGetProductsQuery, useRemoveProductMutation } from "@/redux/api/api";
import { useState } from "react";
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import EditProductModal from "./EditProductModal";
import { TProduct } from "./ProductList";

const ProductTable = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery({});
    const [removeProduct] = useRemoveProductMutation();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const handleDeleteProduct = (id: string) => {
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
    };

    const handleEditProduct = (id: string) => {
        setSelectedProductId(id);
        setEditModalOpen(true);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (isError) {
        return <p>Something went wrong</p>;
    }

    return (
        <>
            {
                products?.data?.length === 0
                    ? <div className="text-center border p-5 rounded-md my-3 text-red-400 font-semibold text-xl">
                        No Products Found
                    </div>
                    : <Table>
                        <TableHeader>
                            <TableRow >
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-center">Stock Quantity</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-center">Image</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products?.data?.map((product: TProduct) => (
                                <TableRow key={product._id}>
                                    <TableCell className="font-medium">{product.title}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell className="text-center" >{product.stock}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell className="flex justify-center items-center">
                                        <figure className="w-40 h-28">
                                            <img src={product.image} className="rounded-md w-full h-full object-cover" alt="" />
                                        </figure>
                                    </TableCell>
                                    <TableCell className="space-x-3">
                                        <Button onClick={() => handleDeleteProduct(product._id)} variant="outline" className="hover:bg-red-500 px-3 hover:text-gray-100 border-red-500">
                                            <FaRegTrashCan className="size-5 " />
                                        </Button>

                                        <Button onClick={() => handleEditProduct(product._id)} variant="outline" className="hover:bg-blue-500 px-3 hover:text-gray-100 border-blue-500">
                                            <FaPenToSquare className="size-5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            }
            {selectedProductId && (
                <EditProductModal
                    productId={selectedProductId}
                    open={editModalOpen}
                    onClose={() => setEditModalOpen(false)}
                />
            )}
        </>
    );
};

export default ProductTable;
