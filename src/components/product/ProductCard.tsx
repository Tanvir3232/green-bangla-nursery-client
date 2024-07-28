import { Button } from "../ui/button";

const ProductCard = ({ product }) => {
    console.log(product)
    const { title, price, rating, image, _id, } = product;
    return (
        <div className="h-[300px] rounded-md shadow-sm hover:shadow-lg p-3  overflow-hidden flex flex-col justify-between">
            <figure className="w-48 h-36 rounded-md overflow-hidden">
                <img className="object-cover w-full h-full " src={image} alt={title} />
            </figure>
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Price:</strong> {price}</p>
            <p><strong>Rating:</strong> {rating}</p>
            <Button className="font-bold text-md">Add to Cart</Button>
        </div>
    )
}
export default ProductCard;