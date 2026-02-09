import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi';

export default function CartPage() {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) throw new Error('CartContext not found');

  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } =
    cartContext;

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6'>
      {/* HEADER */}
      <div className='flex items-center gap-3 mb-6'>
        <FiShoppingCart size={28} />

        <h1 className='text-3xl font-bold'>Your Cart</h1>

        <span className='text-gray-500'>({totalItems} items)</span>
      </div>

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <div className='bg-white p-8 rounded-xl shadow-md text-center'>
          <FiShoppingCart size={50} className='mx-auto text-gray-400 mb-3' />

          <p className='text-lg text-gray-600'>Your cart is empty</p>

          <button
            onClick={() => navigate('/')}
            className='mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
          >
            Browse Menu
          </button>
        </div>
      )}

      {/* CART ITEMS */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* LEFT SIDE */}
        <div className='lg:col-span-2 space-y-4'>
          {cart.map((item) => (
            <div
              key={item._id}
              className='
                bg-white
                p-4
                rounded-xl
                shadow-md
                flex
                justify-between
                items-center
                hover:shadow-lg
                transition
              '
            >
              {/* INFO */}
              <div>
                <h2 className='font-semibold text-lg'>{item.name}</h2>

                <p className='text-green-600 font-bold'>₹{item.price}</p>
              </div>

              {/* CONTROLS */}
              <div className='flex items-center gap-3'>
                {/* QUANTITY STEPPER */}
                <div className='flex items-center border rounded-lg overflow-hidden'>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className='px-3 py-1 hover:bg-gray-200 transition'
                  >
                    −
                  </button>

                  <span className='px-4'>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className='px-3 py-1 hover:bg-gray-200 transition'
                  >
                    +
                  </button>
                </div>

                {/* REMOVE */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className='
                    text-red-500
                    hover:text-red-700
                    hover:scale-110
                    transition
                  '
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE SUMMARY */}
        {cart.length > 0 && (
          <div
            className='
              bg-white
              p-6
              rounded-xl
              shadow-md
              h-fit
              sticky
              top-6
            '
          >
            <h2 className='text-xl font-bold mb-4'>Order Summary</h2>

            <div className='flex justify-between mb-2'>
              <span>Items</span>

              <span>{totalItems}</span>
            </div>

            <div className='flex justify-between mb-4'>
              <span>Total</span>

              <span className='text-green-600 font-bold text-lg'>
                ₹{totalPrice}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className='
                w-full
                bg-green-600
                text-white
                py-2
                rounded-lg
                hover:bg-green-700
                active:scale-95
                transition
              '
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
