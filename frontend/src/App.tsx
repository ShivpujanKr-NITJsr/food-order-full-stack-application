import AppRoutes from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import './index.css';
export default function App() {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
}
