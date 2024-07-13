import { selectAllCategories } from '@/redux/features/categorySlice';
import { useAppSelector } from '@/redux/hooks';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Space } from 'antd';
import { NavLink } from 'react-router-dom';

const MenuItems = () => {
    const categories = useAppSelector(selectAllCategories);
    console.log(categories)
    const categoryItems: MenuProps['items'] = categories.map(item => ({
        key: item,
        label: <NavLink className={({ isActive }) =>
            isActive ? 'border-b-2 border-[#1677FF] pb-1' : ''
        } to={`categories/${item}`}>
            {item}</NavLink>
    }))


    const menus = [
        {
            name: 'Home',
            route: '/',
        },
        {
            name: 'Categories',
            route: '/categories/', // This is a dummy route just for the NavLink
            isDropdown: true,
            items: categoryItems,
        },
        {
            name: 'Product Manage',
            route: '/product-manage',
        },
        {
            name: 'Cart',
            route: '/cart',
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
                                isActive ? 'border-b-2 border-[#1677FF] pb-1' : ''
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
