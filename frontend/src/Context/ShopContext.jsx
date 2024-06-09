import React, { createContext, useEffect, useState } from "react";
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
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemId": itemId })
            })
                .then((response) => response.json())
                .then((data) => console.log(data));
        }
    }

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

    const getServiceCharge = () => {
        let serviceCharge = 0;
        for (const { productId, selection } of serviceSelection) {
            if (selection === 'Yes' && cartItems[productId] > 0) {
                serviceCharge = 30000;
                break;
            }
        }
        return serviceCharge;
    }

    const getTotalWithServiceCharge = () => {
        return getTotalCartAmount() + getServiceCharge();
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

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
        removeFromCart,
        clearCart,
        updateServiceSelection,
        getServiceCharge,
        getTotalWithServiceCharge,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}

export default ShopContextProvider;
