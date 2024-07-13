import { Drawer } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuItems from './MenuItems';
// const { Search } = Input;
const Header = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <div className="bg-[#083214] p-5 flex justify-between items-center">

            <nav className=" w-full flex  items-center justify-between ">
                <Link to='/'><img className="lg:w-48 md:w-40 sm:w-36 w-32 " src="./logo.png" /></Link>
                {/* <div className='w-1/3 mx-auto'>
                    <Search placeholder="input search text" allowClear enterButton />
                </div> */}

                <ul className="lg:flex hidden items-center justify-between gap-5 text-white font-semibold text-md">

                    <MenuItems />
                </ul>
                <ul className="lg:hidden">

                    <img src="./menu.png" onClick={showDrawer} alt="" />
                    <Drawer title="Close" onClose={onClose} open={open}>
                        <ul className=' space-y-3 font-semibold text-md'>
                            <MenuItems />
                        </ul>
                    </Drawer>
                </ul>

            </nav>

        </div>
    )
}
export default Header;