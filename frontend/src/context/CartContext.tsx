import { createContext, useState, ReactNode, FC, useMemo } from 'react';

/* ================= TYPES ================= */

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];

  addToCart: (item: Omit<CartItem, 'quantity'>) => void;

  removeFromCart: (id: string) => void;

  updateQuantity: (id: string, quantity: number) => void;

  clearCart: () => void;

  totalItems: number;

  totalPrice: number;
}

/* ================= CONTEXT ================= */

export const CartContext = createContext<CartContextType | null>(null);

/* ================= PROVIDER ================= */

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  /* ===== ADD TO CART ===== */

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i._id === item._id);

      if (existing) {
        return prevCart.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  /* ===== REMOVE ITEM ===== */

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  /* ===== UPDATE QUANTITY ===== */

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  /* ===== CLEAR CART ===== */

  const clearCart = () => {
    setCart([]);
  };

  /* ===== DERIVED VALUES ===== */

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  /* ===== PROVIDER VALUE ===== */

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
