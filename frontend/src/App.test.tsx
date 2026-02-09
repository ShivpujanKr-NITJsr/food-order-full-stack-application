import { describe, it, expect } from 'vitest';
import App from './App';
import { renderWithProviders } from './test/test-utils';

describe('App', () => {
  it('renders without crashing', () => {
    const { getByText } = renderWithProviders(<App />);

    expect(getByText(/Food Delivery/i)).toBeDefined();
  });
});
