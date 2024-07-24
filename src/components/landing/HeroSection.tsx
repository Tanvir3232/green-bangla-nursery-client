import { Carousel } from "antd";

const HeroSection = () => {


    return (
        <div >
            <Carousel autoplay={true} arrows infinite={false}>
                <div>
                    <img src="./garden.webp" alt="Garden" />
                </div>
                <div>
                    <img src="./food.webp" alt="Food" />
                </div>
                <div>
                    <img src="./indoor.webp" alt="Indoor" />
                </div>
                <div>
                    <img src="./plants.webp" alt="Plants" />
                </div>

            </Carousel>
        </div>
    )
}
export default HeroSection;