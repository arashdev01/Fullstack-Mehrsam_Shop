import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => { try { return JSON.parse(localStorage.getItem('mehrsam-cart') || '[]'); } catch { return []; } });

  const addToCart = (product) => {
    setCartItems((prev) => {
      const isExist = prev.find(item => item.id === product.id);
      if (isExist) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => { try { localStorage.setItem('mehrsam-cart', JSON.stringify(cartItems)); } catch { /* Storage is optional. */ } }, [cartItems]);
  const removeFromCart = (id) => {
    setCartItems(prev => prev.flatMap(item => item.id !== id ? [item] : item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []));
  };

  const clearCart = () => setCartItems([]);

  return (
    // Cart actions are centralized for consistent quantity and persistence behavior.
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);