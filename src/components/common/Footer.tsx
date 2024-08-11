import { CiFacebook, CiLocationOn } from "react-icons/ci";
import { FaArrowCircleRight, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { TiSocialLinkedinCircular, TiSocialTwitterCircular } from "react-icons/ti";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";
const Footer = () => {
    return (
        <div className="bg-[#083214] px-5 py-3 text-gray-300 ">
            <div className="flex lg:flex-row md:flex:row flex-col space-y-5 justify-between">
                <div className="space-y-5">
                    <figure className="">
                        <img src="/logo.png" className="-ml-2" alt="logo" />
                    </figure>
                    <div className=" lg:ml-2 md:ml-2  flex items-center gap-2">
                        <Link to='https://www.facebook.com/'> <CiFacebook className="size-8 " /></Link>
                        <Link to='https://www.linkedin.com/'>  <TiSocialLinkedinCircular className="size-8 " /></Link>
                        <Link to='https://x.com/'><TiSocialTwitterCircular className="size-8 " /></Link>


                    </div>
                </div>



                <div className="lg:ml-2 md:ml-2 space-y-1">
                    <h1 className="text-2xl font-bold ">How to Find Us</h1>
                    <h3 className="font-bold">Green Bangla Nursery</h3>
                    <p className="flex items-center gap-2"><CiLocationOn className="size-5" /> <span>Kismoth Maijbagh,Golapgonj,Sylhet</span></p>
                    <p className="flex items-center gap-2"><FaPhoneAlt className="size-5" /><span> 01648736464</span></p>
                    <p className="flex items-center gap-2" ><MdOutlineMailOutline className="size-5" /> <span>tanvirahmadstudent@gmail.com</span></p>
                </div>


                <div>
                    <h1 className="text-2xl font-bold">Links</h1>
                    <ul className="space-y-1">
                        <MenuItems />
                    </ul>
                </div>
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">Join The Green Nursury <br /> community for goodies!</h1>
                    <p>Get discounts, gardening tips and more!</p>
                    <div className="flex items-center">
                        <input type="text" placeholder="Your Email Address" className="px-4 py-2 w-full rounded-md" />
                        <button><FaArrowCircleRight className=" size-9 text-gray-700 hover:text-gray-900 -ml-10" /></button>
                    </div>
                </div>



            </div>
            <p className="text-center text-sm pt-5">All rights &copy; reserved  Green Bangla Nursery 2024.</p>
        </div>


    )
}
export default Footer;