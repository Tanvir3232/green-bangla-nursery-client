import { useState } from "react";

import { selectCartItems, selectCartTotalPrice } from "@/redux/features/cartSlice";
import { useNavigate } from "react-router-dom";

import { useCreateOrderMutation } from "@/redux/api/api";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-hot-toast";

const CheckoutForm = () => {
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const cartItems = useAppSelector(selectCartItems);
    const totalPrice = useAppSelector(selectCartTotalPrice);
    const navigate = useNavigate();
    const [createOrder] = useCreateOrderMutation();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (!customerName || !phone || !address) {
            toast.error("Please fill in all the fields.");
            return;
        }


        const order = {
            customerName,
            phone,
            address,
            items: cartItems,
            total: totalPrice,
            status: "pending",
            orderDate: new Date().toISOString(),
        };


        try {
            const response = await createOrder(order).unwrap();
            console.log("Order created successfully:", response);
            // Show a success toast notification
            toast.success("Order placed successfully!");
            navigate("/order-success");
        } catch (error) {
            console.error("Failed to create order:", error);
            toast.error("Failed to create order!");
        }


    };

    return (
        <div className="w-4/5 mx-auto my-5 border p-5 border-gray-200 shadow-sm rounded-md">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-medium">Name</label>
                    <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter your address"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-medium">Cart Items</h2>
                    <ul className="space-y-2 ">
                        {cartItems.map((item) => (
                            <li key={item._id} className="flex mb-2 pb-2 justify-between">

                                <span className="flex gap-2 items-center">
                                    <figure className="w-12 h-8 rounded-sm overflow-hidden">
                                        <img src={item.image} className="object-cover w-full h-full" alt="" />
                                    </figure>
                                    {item.title} x {item.quantity}
                                </span>
                                <span>${item.totalPrice}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-between items-center mt-5">
                    <p className="text-xl font-bold">Total Price: ${totalPrice.toFixed(2)}</p>
                    <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
                        Place Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
