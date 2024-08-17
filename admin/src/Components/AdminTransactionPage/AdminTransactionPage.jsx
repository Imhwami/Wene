import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminTransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [sales, setSales] = useState([]);

    useEffect(() => {
        // Fetch all transactions
        axios.get('/alltransactions')
            .then(res => setTransactions(res.data.transactions))
            .catch(err => console.error(err));

        // Fetch total sales per product
        axios.get('/totalsales')
            .then(res => setSales(res.data.sales))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Transactions</h1>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(tx => (
                        <tr key={tx._id}>
                            <td>{tx.userId.name} ({tx.userId.email})</td>
                            <td>{tx.productId.name}</td>
                            <td>{tx.quantity}</td>
                            <td>${tx.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Total Sales</h2>
            <ul>
                {sales.map(sale => (
                    <li key={sale.productId}>
                        {sale.productName}: {sale.totalQuantity} units sold, ${sale.totalRevenue} total revenue
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminTransactionsPage;
