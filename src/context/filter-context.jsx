import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontex";
import reducer from '../reducer/filterReducer'

const filterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: 'lowest',
    filters: {
        text: "",
        category: "all",
        company: "all",
        color: "all",
        price: 0,
        maxPrice: 0,
        minPirce: 0,
    }
}

export const FilterContextProvider = ({ children }) => {
    const { products } = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    // to set the grid view
    const setGridView = () => {
        return dispatch({ type: "SET_GRID_VIEW" });
    }

    // to set the grid view
    const setListView = () => {
        return dispatch({ type: "SET_LIST_VIEW" });
    }

    // sorting function 
    const sorting = (event) => {
        let userValue = event.target.value;
        return dispatch({ type: "SET_SORT_VALUE", payload: userValue });
    }

    // update the filter values 
    const updateFilterValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { name, value } })
    }

    // to clear the filter 
    const clearFilters = () => {
        dispatch({ type: "CLEAR_FILTERS" })
    }

    useEffect(() => {
        dispatch({ type: "FILTER_PRODUCTS" });
        dispatch({ type: "SORTING_PRODUCTS", payload: products });
    }, [products, state.sorting_value, state.filters]);

    useEffect(() => {
        dispatch({ type: 'LOAD_FILTER_PRODUCTS', payload: products })

    }, [products])


    return (
        <filterContext.Provider
            value={{ ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters }}>
            {children}
        </filterContext.Provider>
    )
}

export const useFilterContext = () => {
    return useContext(filterContext);
}