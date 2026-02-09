import React, { useEffect, useState } from 'react';
import { socket } from '../socket/socket';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrder } from '../utils/api/order/order';
import { FiCheckCircle, FiClock, FiTruck, FiPackage } from 'react-icons/fi';
import { api } from '../utils/api';

const steps = [
  {
    key: 'Order Received',
    label: 'Order Received',
    icon: FiPackage,
  },
  {
    key: 'Preparing',
    label: 'Preparing',
    icon: FiClock,
  },
  {
    key: 'Out for Delivery',
    label: 'Out for Delivery',
    icon: FiTruck,
  },
  {
    key: 'Delivered',
    label: 'Delivered',
    icon: FiCheckCircle,
  },
];

export default function TrackingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ORDER ================= */

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        const order = await api.order.getOrder(id);
        setStatus(order.status);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    const handleUpdate = (data: any) => {
      if (data.orderId === id) {
        setStatus(data.status);
      }
    };

    socket.on('orderStatusUpdate', handleUpdate);

    // CORRECT CLEANUP
    return () => {
      socket.off('orderStatusUpdate', handleUpdate);
    };
  }, [id]);

  /* ================= PROGRESS INDEX ================= */

  const currentStep = steps.findIndex((s) => s.key === status);

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <div className='text-lg font-semibold'>Loading order status...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center p-6'>
      <div className='bg-white shadow-xl rounded-xl p-8 w-full max-w-lg'>
        {/* Header */}
        <h1 className='text-2xl font-bold text-center mb-6'>Order Tracking</h1>

        {/* Status text */}
        <div className='text-center mb-6'>
          <span className='text-gray-600'>Current Status:</span>

          <div className='text-xl font-semibold text-blue-600'>{status}</div>
        </div>

        {/* Progress Stepper */}
        <div className='space-y-6'>
          {steps.map((step, index) => {
            const Icon = step.icon;

            const completed = index <= currentStep;

            return (
              <div key={step.key} className='flex items-center gap-4'>
                {/* Icon */}
                <div
                  className={`p-2 rounded-full ${
                    completed
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  <Icon size={20} />
                </div>

                {/* Label */}
                <div
                  className={`font-medium ${
                    completed ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className='mt-6'>
          <div className='w-full bg-gray-200 rounded-full h-2'>
            <div
              className='bg-green-500 h-2 rounded-full transition-all duration-500'
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className='mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}
