const cartreducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        let { id, color, amount, product } = action.payload;
        // console.log(amount);

        // tackle existing product 
        let existingProduct = state.cart.find(
            (curItem) => curItem.id = id + color
        );

        if (existingProduct) {
            let updateProduct = state.cart.map((curElem) => {
                if (curElem.id == id + color) {
                    let newAmount = curElem.amount + amount;
                    if (newAmount >= curElem.max) {
                        newAmount = curElem.max;
                    }
                    return {
                        ...curElem,
                        amount: newAmount,
                    };
                } else {
                    return curElem;
                }
            })
            return {
                ...state,
                cart: updateProduct,
            }

        } else {
            let cartProduct = {
                id: id + color,
                name: product.name,
                color,
                amount,
                image: product.image[0].url,
                price: product.price,
                max: product.stock,
            };

            return {
                ...state,
                cart: [...state.cart, cartProduct]
            }
        }
    }

    // to set the increment and decrement 
    if (action.type === "DECREMENT_NUM") {
        let updateProduct = state.cart.map((curElem) => {
            if (curElem.id === action.payload) {
                let decAmount = curElem.amount > 1 ? curElem.amount - 1 : curElem.amount;
                return {
                    ...curElem,
                    amount: decAmount,
                }
            } else {
                return curElem;
            }
        })
        return { ...state, cart: updateProduct }
    }

    if (action.type === "INCREMENT_NUM") {
        let updateProduct = state.cart.map((curElem) => {
            if (curElem.id === action.payload) {
                let decAmount = curElem.amount < curElem.max ? curElem.amount + 1 : curElem.amount;
                return {
                    ...curElem,
                    amount: decAmount,
                }
            } else {
                return curElem;
            }
        })
        return { ...state, cart: updateProduct }
    }



    if (action.type === "REMOEV_ITEM") {
        let updatedCart = state.cart.filter((curElem) => curElem.id !== action.payload)

        return {
            ...state,
            cart: updatedCart,
        }
    }

    // to clear cart 
    if (action.type === "CLEAR_CART") {
        return {
            ...state,
            cart: []
        }
    }


    // // show product number in navbar trolley 
    // if (action.type === "CART_TOTAL_ITEM") {
    //     let updatedItemVal = state.cart.reduce((accum, curElem) => {
    //         let { amount } = curElem;
    //         return accum = accum + amount;
    //     }, 0)
    //     return {
    //         ...state,
    //         total_item: updatedItemVal,
    //     }
    // }

    // // total subtotal price 
    // if (action.type === "CART_TOTAL_PRICE") {
    //     let total_price = state.cart.reduce((accum, curElem) => {
    //         let { price, amount } = curElem;
    //         return accum = accum + (price * amount);
    //     }, 0)
    //     return {
    //         ...state,
    //         total_price: total_price,
    //     }
    // }


    // the above to comment if statement together 
    if (action.type === "CART_ITEM_PRICE_TOTAL") {
        let { total_item, total_price } = state.cart.reduce((accum, curElem) => {
            let { price, amount } = curElem;

            accum.total_item += amount;
            accum.total_price += price * amount;
            return accum;

        }, { total_item: 0, total_price: 0 })
        return {
            ...state,
            total_item,
            total_price,
        }
    }

    return state;

}

export default cartreducer;