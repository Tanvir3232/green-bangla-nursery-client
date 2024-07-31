import App from "@/App";
import ProductDetails from "@/components/product/ProductDetails";
import Cart from "@/pages/cart/Cart";
import Category from "@/pages/category/Category";
import Home from "@/pages/home/Home";
import ProductManage from "@/pages/productManage/ProductManage";
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
            }
        ]
    },
]);
export default router;