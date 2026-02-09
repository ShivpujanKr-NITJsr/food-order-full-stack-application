import { StatusCodes } from 'http-status-codes';

import { headers } from '../../../config/config';
import { request } from '../api';
import { AUTHORIZATION } from '../../../constants/api/auth';
import { MESSAGE } from '../../../constants/api/message';

const { post, get } = request;

const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = 'orders/';

/* ================= CREATE ORDER ================= */

export const createOrder = async (payload: any) => {
  try {
    const endpoint = `${initialRoute}create`;

    const token = localStorage.getItem('jwt_token');

    const response = await post(endpoint, JSON.stringify(payload), {
      ...headers,
      [Authorization]: `${Bearer} ${token}`,
    });

    if (response) {
      const {
        data: { message },
      } = response;

      if (message === MESSAGE.post.succ) {
        const {
          data: { result },
        } = response;

        return result;
      }

      throw new Error('Order creation failed');
    }

    throw new Error('No response');
  } catch (error: any) {
    if (error.response) {
      const { status } = error.response;

      if (status === StatusCodes.UNAUTHORIZED) {
        alert('Unauthorized. Please login again.');
      } else {
        alert('Internal Server Error');
      }
    } else if (error.message === 'Network Error') {
      alert('Network Error. Check connection.');
    }

    throw error;
  }
};

/* ================= GET ORDER ================= */

export const getOrder = async (orderId: string) => {
  try {
    const endpoint = `${initialRoute}${orderId}`;

    const token = localStorage.getItem('jwt_token');

    const response = await get(endpoint, {
      ...headers,
      [Authorization]: `${Bearer} ${token}`,
    });

    if (response) {
      const {
        data: { message },
      } = response;

      if (message === MESSAGE.get.succ) {
        const {
          data: { result },
        } = response;

        return result;
      }

      throw new Error('Order fetch failed');
    }

    throw new Error('No response');
  } catch (error: any) {
    if (error.response) {
      const { status } = error.response;

      if (status === StatusCodes.UNAUTHORIZED) {
        alert('Unauthorized. Please login again.');
      }
    } else if (error.message === 'Network Error') {
      alert('Network Error. Check connection.');
    }

    throw error;
  }
};

export const order = {
  createOrder,
  getOrder,
};
