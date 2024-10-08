import { useGetProductQuery, useUpdateProductMutation } from '@/redux/api/api';
import { selectAllCategories } from '@/redux/features/categorySlice';
import { useAppSelector } from '@/redux/hooks';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
interface EditProductModalProps {
    productId: string;
    open: boolean;
    onClose: () => void;
}
const EditProductModal = ({ productId, open, onClose }: EditProductModalProps) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { data: product, isLoading } = useGetProductQuery(productId, { skip: !open });
    const [updateProduct] = useUpdateProductMutation();
    const [selectedCategory, setSelectedCategory] = useState(product?.data?.category);
    const categories = useAppSelector(selectAllCategories);

    useEffect(() => {
        if (product) {
            reset(product.data);
            setSelectedCategory(product.data.category);
        }
    }, [product, reset]);


    const onSubmit = async (formData: FieldValues) => {
        const updatedData = {
            ...formData,
            category: selectedCategory,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            rating: parseFloat(formData.rating)
        };

        await updateProduct({ id: productId, data: updatedData });
        onClose()
        Swal.fire({
            icon: 'success',
            title: 'Product Updated!',
            text: 'Product has been successfully updated.',
            confirmButtonText: 'OK',
        });

    };



    return (
        <Dialog open={open} onOpenChange={onClose}>

            <DialogContent className="sm:max-w-[425px] max-w-[350px] md:max-w-[720px] lg:max-w-[1020px] overflow-y-scroll max-h-screen">
                <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                    <DialogDescription>Use this form to update product to the inventory</DialogDescription>
                </DialogHeader>
                {
                    isLoading
                        ? <p><Spin /> Loading... </p>
                        : <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right">
                                        Title
                                    </Label>
                                    <Input id="title" defaultValue={product?.data?.title} className="col-span-3" {...register("title", { required: true })} />
                                    <div className="col-span-4 text-right">
                                        {errors.title && <span className="text-red-500">This field is required</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right">
                                        Category
                                    </Label>
                                    <Select onValueChange={setSelectedCategory} defaultValue={selectedCategory}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {categories.map((item) => (
                                                    <SelectItem key={item.name} value={item.name}>{item.name}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <div className="col-span-4 text-right">
                                        {errors.category && <span className="text-red-500">This field is required</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Description
                                    </Label>
                                    <Textarea id="description" className="col-span-3" {...register("description", { required: true })} />
                                    <div className="col-span-4 text-right">
                                        {errors.description && <span className="text-red-500">This field is required</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="price" className="text-right">
                                        Price
                                    </Label>
                                    <Input id="price" defaultValue={product?.data?.price} inputMode="numeric" type="number" className="col-span-3" {...register("price", { required: true })} />
                                    <div className="col-span-4 text-right">
                                        {errors.price && <span className="text-red-500">This field is required</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="stock" className="text-right">
                                        Stock
                                    </Label>
                                    <Input id="stock" defaultValue={product?.data?.stock} inputMode="numeric" type="number" className="col-span-3" {...register("stock", { required: true })} />
                                    <div className="col-span-4 text-right">
                                        {errors.stock && <span className="text-red-500">This field is required</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="rating" className="text-right">
                                        Rating
                                    </Label>
                                    <Input id="rating" defaultValue={product?.data?.rating} inputMode="decimal" max={5} min={0} className="col-span-3" {...register("rating", { required: true })} />
                                    <div className="col-span-4 text-right">
                                        {errors.rating && <span className="text-red-500">This field is required</span>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="imageUrl" className="text-right">
                                        Image URL
                                    </Label>
                                    <Input id="image" className="col-span-3" {...register("image", { required: true })} />
                                    <div className="col-span-4 text-right">
                                        {errors.image && <span className="text-red-500">This field is required</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-2 pt-6">
                                <Button variant="outline" className='' onClick={onClose}>Cancel</Button>
                                <Button type="submit">Save</Button>
                            </div>
                        </form>
                }
            </DialogContent>
        </Dialog>
    );
};

export default EditProductModal;
