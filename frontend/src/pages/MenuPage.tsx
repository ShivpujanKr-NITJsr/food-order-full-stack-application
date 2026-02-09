import React, { useEffect, useState, useContext } from 'react';
import { getMenu } from '../utils/api/menu/menu';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { api } from '../utils/api';

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) throw new Error('CartContext missing');

  const { addToCart, totalItems } = cartContext;

  useEffect(() => {
    const loadMenu = async () => {
      const data = await api.menu.getMenu();

      setMenu(data);

      setLoading(false);
    };

    loadMenu();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-200'>
      {/* HEADER */}
      <header className='bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-10'>
        <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
          🍔 Food Delivery
        </h1>

        {/* CART ICON */}
        <div
          className='relative cursor-pointer hover:scale-110 transition-transform duration-200'
          onClick={() => navigate('/cart')}
        >
          <FiShoppingCart
            size={28}
            className='text-gray-700 hover:text-blue-600 transition'
          />

          {totalItems > 0 && (
            <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse'>
              {totalItems}
            </span>
          )}
        </div>
      </header>

      {/* TITLE */}
      <div className='p-6'>
        <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Our Menu
        </h2>

        {/* LOADING SKELETON */}
        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className='bg-white rounded-xl shadow-md animate-pulse'
              >
                <div className='h-48 bg-gray-300 rounded-t-xl'></div>

                <div className='p-4 space-y-2'>
                  <div className='h-4 bg-gray-300 rounded w-3/4'></div>

                  <div className='h-4 bg-gray-300 rounded w-1/2'></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {menu?.map((item) => (
              <div
                key={item._id}
                className='
                  bg-white
                  rounded-xl
                  shadow-md
                  overflow-hidden
                  transform
                  hover:-translate-y-2
                  hover:shadow-xl
                  transition-all
                  duration-300
                  group
                '
              >
                {/* IMAGE */}
                <div className='overflow-hidden'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='
                      w-full
                      h-48
                      object-cover
                      group-hover:scale-110
                      transition-transform
                      duration-300
                    '
                  />
                </div>

                {/* CONTENT */}
                <div className='p-4'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {item.name}
                  </h3>

                  <p className='text-gray-500 text-sm mb-3'>
                    {item.description}
                  </p>

                  <div className='flex justify-between items-center'>
                    <span className='text-green-600 font-bold text-lg'>
                      ₹{item.price}
                    </span>

                    <button
                      onClick={() =>
                        addToCart({
                          _id: item._id,
                          name: item.name,
                          price: item.price,
                        })
                      }
                      className='
                        bg-blue-600
                        text-white
                        px-4
                        py-1
                        rounded-lg
                        hover:bg-blue-700
                        active:scale-95
                        transition-all
                        duration-150
                        shadow-sm
                        hover:shadow-md
                      '
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
