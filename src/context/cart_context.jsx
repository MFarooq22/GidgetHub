import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from '../reducer/cartReducer'

const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("FarooqCart");
    if (localCartData === []) {
        return [];
    } else {
        return JSON.parse(localCartData);
    }
}

const initialState = {
    // cart: [],
    cart: getLocalCartData(),
    total_item: "",
    total_price: "",
    shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const add_to_cart = (id, color, amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } })
    }

    // remove individual item from cart 
    const removeItem = (id) => {
        dispatch({ type: "REMOEV_ITEM", payload: id })
    }

    // for button to clear cart 
    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    const setIncrease = (id) => {
        dispatch({ type: "INCREMENT_NUM", payload: id })
    };

    const setDecrease = (id) => {
        dispatch({ type: "DECREMENT_NUM", payload: id })
    };


    useEffect(() => {
        // dispatch({ type: "CART_TOTAL_ITEM" })
        // dispatch({ type: "CART_TOTAL_PRICE" })
        dispatch({ type: "CART_ITEM_PRICE_TOTAL" })
        localStorage.setItem("FarooqCart", JSON.stringify(state.cart))
    }, [state.cart])


    return (<CartContext.Provider
        value={{ ...state, add_to_cart, removeItem, clearCart, setDecrease, setIncrease }}>{children}</CartContext.Provider>)
}

const useCartContext = () => {
    return useContext(CartContext)
}

export { useCartContext };
export default CartProvider;