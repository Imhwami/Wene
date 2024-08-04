import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        const fetchAllProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/allproducts');
                if (!response.ok) {
                    throw new Error('Failed to fetch all products');
                }
                const data = await response.json();
                setAll_Product(data);
            } catch (error) {
                toast.error(`Error fetching all products`);
            }
        };

        fetchAllProducts();

        const fetchCartItems = async () => {
            if (localStorage.getItem('auth-token')) {
                try {
                    const response = await fetch('http://localhost:4000/getcart', {
                        method: "POST",
                        headers: {
                            Accept: 'application/form-data',
                            'auth-token': `${localStorage.getItem('auth-token')}`,
                            'Content-Type': 'application/json',
                        },
                        body: "",
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch cart items');
                    }
                    const data = await response.json();
                    setCartItems(data);
                } catch (error) {
                    toast.error(`Error fetching cart items`);
                }
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        localStorage.setItem('serviceSelection', JSON.stringify(serviceSelection));
    }, [serviceSelection]);

    const addToCart = async (itemId) => {
        const id = Number(itemId); // Ensure itemId is a number
        setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    
        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch('http://localhost:4000/addtocart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "itemId": id }) // Ensure itemId is passed as a number
                });
                if (!response.ok) {
                    throw new Error('Failed to add item to cart');
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                toast.error(`Error adding item to cart: ${error.message}`);
            }
        }
    };

    const removeFromCart = async (itemId) => {
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
                if (!response.ok) {
                    throw new Error('Failed to remove item from cart');
                }
                const data = await response.json();
                console.log(data);
                return { success: true, message: data.message };
            } catch (error) {
                console.error("Error removing item from cart:", error);
                toast.error(`Error removing item from cart: ${error.message}`);
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
    };

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
    };

    const clearCart = async () => {
        setCartItems(getDefaultCart());
        setServiceSelection([]);
        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch('http://localhost:4000/clearcart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json'
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to clear cart');
                }
                const data = await response.json();
                console.log(data);
            } catch (error) {
                toast.error(`Error clearing cart: ${error.message}`);
            }
        }
    };

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
