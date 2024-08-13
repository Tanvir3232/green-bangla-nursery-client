import Categories from "@/components/landing/Categories";
import Gallery from "@/components/landing/Gallery";
import HeroSection from "@/components/landing/HeroSection";
import ProductContainer from "@/components/product/ProuductContainer";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | GB Nursery</title>
            </Helmet>
            <HeroSection />
            <Categories />
            <ProductContainer />
            <Gallery />
        </div>
    )
}
export default Home;