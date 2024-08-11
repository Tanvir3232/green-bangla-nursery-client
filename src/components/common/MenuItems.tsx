import { selectAllCategories } from '@/redux/features/categorySlice';
import { useAppSelector } from '@/redux/hooks';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';
import { NavLink } from 'react-router-dom';

const MenuItems = () => {
    const categories = useAppSelector(selectAllCategories);

    const categoryItems: MenuProps['items'] = categories.map(item => ({
        key: item.name,
        label: (
            <NavLink
                className={({ isActive }) =>
                    isActive ? 'border-b-2  border-[#1677FF] pb-1 text-md font-semibold' : 'text-md font-semibold'
                }
                to={`categories/${item.name}`}
            >
                <img src={item.icon} alt={item.name} className="w-6 h-6 mr-2 rounded-md inline-block" />
                {item.name}
            </NavLink>
        )
    }));

    const menus = [
        {
            name: 'Home',
            route: '/',
        },
        {
            name: "Products",
            route: '/products'
        },
        {
            name: 'Categories',
            route: '/categories/', // This is a dummy route just for the NavLink
            isDropdown: true,
            items: categoryItems,
        },
        {
            name: 'Cart',
            route: '/cart',
        },
        {
            name: 'Product Manage',
            route: '/product-manage',
        },
    ];

    return (
        <>
            {menus.map(item =>
                item.isDropdown ? (
                    <li key={item.name} className='w-24'>
                        <Dropdown menu={{ items: item.items }} placement="bottomRight">
                            <a onClick={e => e.preventDefault()}>
                                <Space>
                                    <div style={{ width: '200px' }}>
                                        {item.name}
                                        <DownOutlined />
                                    </div>
                                </Space>
                            </a>
                        </Dropdown>
                    </li>
                ) : (
                    <li key={item.name}>
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? 'border-b-2 border-[#1677FF] pb-1 text-md' : 'text-md'
                            }
                            to={item.route}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                )
            )}
        </>
    );
};

export default MenuItems;
