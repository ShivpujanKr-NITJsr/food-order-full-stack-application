import axios, {
  RawAxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
} from 'axios';

import { url, port, version } from '../../config/config';

/* ================= BASE URL ================= */

const BASE_URL = `${url}:${port}/api/${version}`;

/* ================= GENERIC GET ================= */

const get = async <T = any>(
  endpoint: string,
  headers?: RawAxiosRequestHeaders,
  params: Record<string, any> = {}
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.get<T>(`${BASE_URL}/${endpoint}`, {
      headers,
      params,
    });

    if (response.status === 200) return response;

    throw new Error(`GET failed: ${response.status}`);
  } catch (error) {
    const err = error as AxiosError;

    console.error('GET Error:', err.message);

    throw err;
  }
};

/* ================= GENERIC POST ================= */

const post = async <T = any, P = any>(
  endpoint: string,
  payload: P,
  headers?: RawAxiosRequestHeaders
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.post<T>(`${BASE_URL}/${endpoint}`, payload, {
      headers,
    });

    if (response.status === 200 || response.status === 201) return response;

    throw new Error(`POST failed: ${response.status}`);
  } catch (error) {
    const err = error as AxiosError;

    console.error('POST Error:', err.message);

    throw err;
  }
};

/* ================= GENERIC PUT ================= */

const put = async <T = any, P = any>(
  endpoint: string,
  payload: P,
  headers?: RawAxiosRequestHeaders
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.put<T>(`${BASE_URL}/${endpoint}`, payload, {
      headers,
    });

    if (response.status === 200) return response;

    throw new Error(`PUT failed: ${response.status}`);
  } catch (error) {
    const err = error as AxiosError;

    console.error('PUT Error:', err.message);

    throw err;
  }
};

/* ================= GENERIC PATCH ================= */

const patch = async <T = any, P = any>(
  endpoint: string,
  payload: P,
  headers?: RawAxiosRequestHeaders
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.patch<T>(`${BASE_URL}/${endpoint}`, payload, {
      headers,
    });

    if (response.status === 200) return response;

    throw new Error(`PATCH failed: ${response.status}`);
  } catch (error) {
    const err = error as AxiosError;

    console.error('PATCH Error:', err.message);

    throw err;
  }
};

/* ================= GENERIC DELETE ================= */

const del = async <T = any>(
  endpoint: string,
  headers?: RawAxiosRequestHeaders
): Promise<AxiosResponse<T>> => {
  try {
    const response = await axios.delete<T>(`${BASE_URL}/${endpoint}`, {
      headers,
    });

    if (response.status === 200) return response;

    throw new Error(`DELETE failed: ${response.status}`);
  } catch (error) {
    const err = error as AxiosError;

    console.error('DELETE Error:', err.message);

    throw err;
  }
};

/* ================= EXPORT ================= */

export const request = {
  get,
  post,
  put,
  patch,
  del,
};
