import Categories from "@/components/landing/Categories";
import Gallery from "@/components/landing/Gallery";
import HeroSection from "@/components/landing/HeroSection";
import ProductList from "@/components/product/ProductList";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <Categories />
            <ProductList />
            <Gallery />
        </div>
    )
}
export default Home;