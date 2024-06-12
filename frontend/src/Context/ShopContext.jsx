import React, { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
export const ShopContext = createContext(null);


const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [serviceSelection, setServiceSelection] = useState(() => JSON.parse(localStorage.getItem('serviceSelection')) || []);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_Product(data));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: "POST",
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((response) => response.json())
                .then((data) => setCartItems(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('serviceSelection', JSON.stringify(serviceSelection));
    }, [serviceSelection]);

    const addToCart = (itemId) => {
        const id = Number(itemId); // Ensure itemId is a number
        setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemId": id }) // Ensure itemId is passed as a number
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
    };
    

    const removeFromCart = async (itemId) => {
        console.log("removeFromCart")
        const id = Number(itemId); // Ensure itemId is a number
        setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 1) - 1 }));
    
        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch('http://localhost:4000/removefromcart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "itemId": id }) // Ensure itemId is passed as a number
                });
                const data = await response.json();
                if (response.ok) {
                    return { success: true, message: data.message };
                } else {
                    throw new Error(data.message || 'Failed to remove item');
                }
            } catch (error) {
                console.error("Error removing item from cart:", error);
                return { success: false, message: error.message };
            }
        }
    };

    const updateServiceSelection = (productId, selection) => {
        const index = serviceSelection.findIndex(item => item.productId === productId);
        if (index !== -1) {
            const updatedServiceSelection = [...serviceSelection];
            updatedServiceSelection[index].selection = selection;
            setServiceSelection(updatedServiceSelection);
        } else {
            setServiceSelection(prev => [...prev, { productId, selection }]);
        }
    }


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        Object.keys(cartItems).forEach((productId) => {
            const product = all_product.find(product => product.id === parseInt(productId));
            if (product && product.new_price) {
                totalAmount += product.new_price * cartItems[productId];
            }
        });
        return totalAmount;
    };


    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const clearCart = () => {
        setCartItems(getDefaultCart());
        setServiceSelection([]);
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/clearcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }

    const contextValue = {
        getTotalCartItems,
        getTotalCartAmount,
        all_product,
        cartItems,
        addToCart,
        updateServiceSelection,
        removeFromCart,
        clearCart,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
