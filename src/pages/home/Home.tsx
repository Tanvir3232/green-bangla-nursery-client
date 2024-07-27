import Categories from "@/components/landing/Categories";
import HeroSection from "@/components/landing/HeroSection";
import ProductList from "@/components/product/ProductList";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <Categories />
            <ProductList />
        </div>
    )
}
export default Home;