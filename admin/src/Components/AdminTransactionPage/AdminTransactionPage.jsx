import React, { useEffect, useState } from 'react';

const AdminTransactionsPage = () => {
    console.log("admintransactionpage");
    const [transactions, setTransactions] = useState([]);
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all transactions
                const transactionsResponse = await fetch('http://localhost:4000/alltransactions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!transactionsResponse.ok) {
                    throw new Error('Failed to fetch transactions');
                }

                const transactionsData = await transactionsResponse.json();
                setTransactions(transactionsData.transactions);

                // Fetch total sales per product
                const salesResponse = await fetch('http://localhost:4000/totalsales', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!salesResponse.ok) {
                    throw new Error('Failed to fetch total sales');
                }

                const salesData = await salesResponse.json();
                setSales(salesData.sales);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Transactions</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};

export default AdminTransactionsPage;
