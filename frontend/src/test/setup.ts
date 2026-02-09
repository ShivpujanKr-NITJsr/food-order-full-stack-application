import { vi } from 'vitest';

/* mock alert */
vi.stubGlobal('alert', vi.fn());

/* mock axios wrapper */
vi.mock('../utils/api/api');

vi.spyOn(console, 'error').mockImplementation(() => {});
vi.spyOn(console, 'warn').mockImplementation(() => {});
