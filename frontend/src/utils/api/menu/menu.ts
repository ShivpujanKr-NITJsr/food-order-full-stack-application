import { StatusCodes } from 'http-status-codes';

import { headers } from '../../../config/config';
import { request } from '../api';
import { AUTHORIZATION } from '../../../constants/api/auth';
import { MESSAGE } from '../../../constants/api/message';

const { get, post } = request;

const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = 'menu/';

/* ================= GET MENU ================= */

export const getMenu = async () => {
  try {
    const endpoint = `${initialRoute}`;

    const token = localStorage.getItem('jwt_token');

    const response = await get(endpoint, {
      ...headers,
      ...(token && {
        [Authorization]: `${Bearer} ${token}`,
      }),
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

      return response.data.data || response.data;
    }

    throw new Error('Failed to fetch menu');
  } catch (error: any) {
    handleError(error);
  }
};

/* ================= CREATE MENU ================= */

export const createMenu = async (payload: any) => {
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

      throw new Error('Menu creation failed');
    }

    throw new Error('No response');
  } catch (error: any) {
    handleError(error);
  }
};

/* ================= ERROR HANDLER ================= */

const handleError = (error: any) => {
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
};

export const menu = {
  getMenu,
  createMenu,
};
