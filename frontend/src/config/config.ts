const ENV: 'PROD' | 'DEV' | 'LOCAL' = 'LOCAL'; // Set the environment variable here

// "PROD" ,"DEV", "LOCAL"

export const local_url = 'http://localhost';
export const local_port = '5000';

export const prod_url = 'https';
export const prod_port = '//your-production-url.com'; // Replace with your production URL and port

export const dev_url = 'http://localhost';
export const dev_port = '5000';

export const version = 'v1'; // Set the API version here

import { RawAxiosRequestHeaders } from 'axios';

export const headers: RawAxiosRequestHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

// backend url
export const url =
  String(ENV) === 'PROD'
    ? prod_url
    : String(ENV) === 'DEV'
      ? dev_url
      : String(ENV) === 'LOCAL'
        ? local_url
        : '';
export const port =
  String(ENV) === 'PROD'
    ? prod_port
    : String(ENV) === 'DEV'
      ? dev_port
      : String(ENV) === 'LOCAL'
        ? local_port
        : '';

export const LINK = `${url}:${port}/api/${version}`; // Set the API base URL here
