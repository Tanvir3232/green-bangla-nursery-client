import { useAddProductMutation } from "@/redux/api/api";
import { selectAllCategories } from "@/redux/features/categorySlice";
import { useAppSelector } from "@/redux/hooks";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

const AddProductModal = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitted } } = useForm();
    const categories = useAppSelector(selectAllCategories);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [addProduct, { isError, isSuccess }] = useAddProductMutation();
    const [dialogOpen, setDialogOpen] = useState(false);

    const onSubmit = async (formData: FieldValues) => {

        if (!selectedCategory) {
            return;
        }
        const data = {
            ...formData,
            category: selectedCategory,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
            rating: parseFloat(formData.rating)
        };
        try {
            await addProduct(data);
            setDialogOpen(false); // Close the dialog if the product is successfully added
            Swal.fire({
                icon: 'success',
                title: 'Product Added!',
                text: 'Your product has been successfully added.',
                confirmButtonText: 'OK',
            });
            reset(); // Reset the form after success
        } catch (error) {
            console.error('Error adding product:', error);

        }
    };

    useEffect(() => {
        if (isSuccess) {

            reset();
        }
    }, [isSuccess, reset]);


    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button><FaPlus className="size-5 mr-2" /> Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-w-[350px] md:max-w-[720px] lg:max-w-[1020px] overflow-y-scroll max-h-screen">
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                    <DialogDescription>Use this form to add a new product to the inventory</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input id="title" className="col-span-3" {...register("title", { required: true })} />
                            <div className="col-span-4 text-right">
                                {errors.title && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                                Category
                            </Label>
                            <Select onValueChange={setSelectedCategory}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categories.map((item) => (
                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <div className="col-span-4 text-right">
                                {isSubmitted && !selectedCategory && <span className="text-red-500">This field is required</span>}
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
                            <Input id="price" inputMode="numeric" type="number" className="col-span-3" {...register("price", { required: true })} />
                            <div className="col-span-4 text-right">
                                {errors.price && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">
                                Quantity
                            </Label>
                            <Input id="quantity" inputMode="numeric" type="number" className="col-span-3" {...register("quantity", { required: true })} />
                            <div className="col-span-4 text-right">
                                {errors.quantity && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rating" className="text-right">
                                Rating
                            </Label>
                            <Input id="rating" inputMode="decimal" max={5} min={0} className="col-span-3" {...register("rating", { required: true })} />
                            <div className="col-span-4 text-right">
                                {errors.rating && <span className="text-red-500">This field is required</span>}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="image" className="text-right">
                                Image Url
                            </Label>
                            <Input id="image" inputMode="url" className="col-span-3" {...register("image", {
                                required: true,
                                pattern: {
                                    value: /^(ftp|http|https):\/\/[^ "]+$/,
                                    message: "Invalid URL"
                                }
                            })} />
                            <div className="col-span-4 text-right">
                                {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                            </div>
                        </div>
                    </div>
                    <Button type="submit">Save</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddProductModal;
