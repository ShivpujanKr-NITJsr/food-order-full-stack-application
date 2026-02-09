import { vi } from 'vitest';

export const mockAxios = {
  get: vi.fn(() =>
    Promise.resolve({
      data: {
        message: 'success',
        result: [],
      },
    })
  ),

  post: vi.fn(() =>
    Promise.resolve({
      data: {
        message: 'success',
        result: {},
      },
    })
  ),

  put: vi.fn(),

  patch: vi.fn(),

  delete: vi.fn(),
};
