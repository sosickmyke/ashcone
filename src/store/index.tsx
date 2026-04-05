import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Product, CartItem, CustomFurnitureRequest, CorporateQuoteRequest, Order } from '@/types';

interface AppState {
  cart: CartItem[];
  wishlist: string[];
  customRequests: CustomFurnitureRequest[];
  corporateRequests: CorporateQuoteRequest[];
  orders: Order[];
  isAdmin: boolean;
}

type Action =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'ADD_CUSTOM_REQUEST'; payload: CustomFurnitureRequest }
  | { type: 'UPDATE_CUSTOM_REQUEST_STATUS'; payload: { id: string; status: CustomFurnitureRequest['status'] } }
  | { type: 'ADD_CORPORATE_REQUEST'; payload: CorporateQuoteRequest }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_ADMIN'; payload: boolean };

const initialState: AppState = {
  cart: [],
  wishlist: [],
  customRequests: [],
  corporateRequests: [],
  orders: [],
  isAdmin: false,
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.includes(action.payload)) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((id) => id !== action.payload),
      };
    case 'ADD_CUSTOM_REQUEST':
      return {
        ...state,
        customRequests: [...state.customRequests, action.payload],
      };
    case 'UPDATE_CUSTOM_REQUEST_STATUS':
      return {
        ...state,
        customRequests: state.customRequests.map((req) =>
          req.id === action.payload.id
            ? { ...req, status: action.payload.status, updatedAt: new Date() }
            : req
        ),
      };
    case 'ADD_CORPORATE_REQUEST':
      return {
        ...state,
        corporateRequests: [...state.corporateRequests, action.payload],
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case 'SET_ADMIN':
      return { ...state, isAdmin: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Helper hooks
export function useCart() {
  const { state, dispatch } = useApp();
  
  const addToCart = (product: Product, quantity: number = 1, customization?: CartItem['customization']) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity, customization } });
  };
  
  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const cartTotal = state.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const cartCount = state.cart.reduce((count, item) => count + item.quantity, 0);
  
  return {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };
}

export function useWishlist() {
  const { state, dispatch } = useApp();
  
  const addToWishlist = (productId: string) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: productId });
  };
  
  const removeFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };
  
  const isInWishlist = (productId: string) => state.wishlist.includes(productId);
  
  return {
    wishlist: state.wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };
}

export function useCustomRequests() {
  const { state, dispatch } = useApp();
  
  const addRequest = (request: CustomFurnitureRequest) => {
    dispatch({ type: 'ADD_CUSTOM_REQUEST', payload: request });
  };
  
  const updateStatus = (id: string, status: CustomFurnitureRequest['status']) => {
    dispatch({ type: 'UPDATE_CUSTOM_REQUEST_STATUS', payload: { id, status } });
  };
  
  return {
    requests: state.customRequests,
    addRequest,
    updateStatus,
  };
}

export function useCorporateRequests() {
  const { state, dispatch } = useApp();
  
  const addRequest = (request: CorporateQuoteRequest) => {
    dispatch({ type: 'ADD_CORPORATE_REQUEST', payload: request });
  };
  
  return {
    requests: state.corporateRequests,
    addRequest,
  };
}

export function useAdmin() {
  const { state, dispatch } = useApp();
  
  const setAdmin = (isAdmin: boolean) => {
    dispatch({ type: 'SET_ADMIN', payload: isAdmin });
  };
  
  return {
    isAdmin: state.isAdmin,
    setAdmin,
    customRequests: state.customRequests,
    corporateRequests: state.corporateRequests,
    orders: state.orders,
  };
}
