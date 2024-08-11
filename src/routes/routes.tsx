import App from "@/App";
import ProductDetails from "@/components/product/ProductDetails";
import Cart from "@/pages/cart/Cart";
import Category from "@/pages/category/Category";
import Checkout from "@/pages/checkout/Checkout";
import OrderSuccess from "@/pages/checkout/OrderSuccess";
import Home from "@/pages/home/Home";
import ProductManage from "@/pages/productManage/ProductManage";
import Products from "@/pages/products/Products";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: 'categories/:category',
                element: <Category />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/product-manage",
                element: <ProductManage />
            },
            {
                path: '/products/:id',
                element: <ProductDetails />
            },
            {
                path: '/checkout',
                element: <Checkout />
            },
            {
                path: "/order-success",
                element: <OrderSuccess />
            }
        ]
    },
]);
export default router;