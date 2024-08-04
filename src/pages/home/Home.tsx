import Categories from "@/components/landing/Categories";
import Gallery from "@/components/landing/Gallery";
import HeroSection from "@/components/landing/HeroSection";
import ProductContainer from "@/components/product/ProuductContainer";

const Home = () => {
    return (
        <div>
            <HeroSection />
            <Categories />
            <ProductContainer />
            <Gallery />
        </div>
    )
}
export default Home;