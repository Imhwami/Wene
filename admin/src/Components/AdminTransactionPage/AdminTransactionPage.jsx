import { useEffect, useState } from 'react';
import './AdminTransactionPage.css';

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
        <div className='bodybody'>
            <h1>Transactions</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Consumer (Email & Name)</th>
                                <th>Product</th>
                                <th>Image</th> {/* New header for image */}
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => {
                                // Convert the backend date to a JavaScript Date object
                                const formattedDate = new Date(tx.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                });

                                // Format the totalPrice with dots every three digits
                                const formattedTotalPrice = tx.totalPrice.toLocaleString('id-ID');

                                return (
                                    <tr key={tx._id}>
                                        <td>{formattedDate}</td>
                                        <td>{tx.userId.name} ({tx.userId.email})</td>
                                        <td>{tx.productId.name}</td>
                                        <td>
                                            {/* Display the product image */}
                                            <img src={tx.productId.image} alt={tx.productId.name} style={{ width: '50px', height: 'auto' }} />
                                        </td>
                                        <td>{tx.quantity}</td>
                                        <td>Rp {formattedTotalPrice}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>


                    <h2>Total Sales</h2>
                    <ul>
                        {sales.map(sale => {
                            // Format the totalRevenue with dots every three digits
                            const formattedTotalRevenue = sale.totalRevenue.toLocaleString('id-ID');

                            return (
                                <li key={sale.productId}>
                                    <img
                                        src={sale.productImage}
                                        alt={sale.productName}
                                        style={{ width: '200px', height: '180px', marginRight: '20px' }}
                                    />
                                    {sale.productName}: {sale.totalQuantity} units sold, with total revenue: Rp {formattedTotalRevenue}
                                </li>
                            );
                        })}
                    </ul>

                </>
            )}
        </div>
    );
};

export default AdminTransactionsPage;
