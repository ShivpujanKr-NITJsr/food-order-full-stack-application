import { vi } from 'vitest';

export const request = {
  get: vi.fn(async () => {
    return {
      status: 200,

      data: {
        message: 'success',

        result: [],
      },
    };
  }),

  post: vi.fn(async () => {
    return {
      status: 200,

      data: {
        message: 'success',

        result: {},
      },
    };
  }),

  put: vi.fn(),

  patch: vi.fn(),

  del: vi.fn(),
};
