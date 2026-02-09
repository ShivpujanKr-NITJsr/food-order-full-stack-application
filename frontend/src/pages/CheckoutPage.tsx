import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { createOrder } from '../utils/api/order/order';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

interface FormData {
  customerName: string;
  address: string;
  phone: string;
}

interface FormErrors {
  customerName?: string;
  address?: string;
  phone?: string;
}

export default function CheckoutPage() {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) {
    throw new Error('CartContext missing');
  }

  const { cart, totalPrice, clearCart } = cartContext;

  const [form, setForm] = useState<FormData>({
    customerName: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // clear error while typing
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  /* ================= VALIDATION ================= */

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.customerName.trim())
      newErrors.customerName = 'Full name is required';

    if (!form.address.trim())
      newErrors.address = 'Delivery address is required';

    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(form.phone))
      newErrors.phone = 'Phone number must be exactly 10 digits';

    if (cart.length === 0) alert('Cart is empty');

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ================= PLACE ORDER ================= */

  const placeOrder = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const order = await api.order.createOrder({
        customerName: form.customerName,
        address: form.address,
        phone: form.phone,
        items: cart,
        total: totalPrice,
      });

      clearCart();

      navigate(`/track/${order._id}`);
    } catch {
      alert('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center'>
      <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-gray-800'>
          Delivery Details
        </h1>

        {/* Name */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Full Name
          </label>

          <input
            type='text'
            name='customerName'
            value={form.customerName}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.customerName
                ? 'border-red-500 focus:ring-red-300'
                : 'border-gray-300 focus:ring-blue-300'
            }`}
            placeholder='Enter your full name'
          />

          {errors.customerName && (
            <p className='text-red-500 text-sm mt-1'>{errors.customerName}</p>
          )}
        </div>

        {/* Address */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Address
          </label>

          <textarea
            name='address'
            value={form.address}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.address
                ? 'border-red-500 focus:ring-red-300'
                : 'border-gray-300 focus:ring-blue-300'
            }`}
            placeholder='Enter delivery address'
          />

          {errors.address && (
            <p className='text-red-500 text-sm mt-1'>{errors.address}</p>
          )}
        </div>

        {/* Phone */}
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Phone Number
          </label>

          <input
            type='tel'
            name='phone'
            value={form.phone}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.phone
                ? 'border-red-500 focus:ring-red-300'
                : 'border-gray-300 focus:ring-blue-300'
            }`}
            placeholder='Enter 10-digit phone number'
          />

          {errors.phone && (
            <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
          )}
        </div>

        {/* Total */}
        <div className='mb-6 flex justify-between text-lg font-semibold'>
          <span>Total</span>
          <span className='text-green-600'>₹{totalPrice}</span>
        </div>

        {/* Button */}
        <button
          onClick={placeOrder}
          disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
