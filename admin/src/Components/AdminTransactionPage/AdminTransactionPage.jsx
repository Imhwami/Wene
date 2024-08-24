import { useEffect, useState } from 'react';
import './AdminTransactionPage.css';

const AdminTransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [sales, setSales] = useState([]);
    const [salesPerDay, setSalesPerDay] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filteredSalesPerDay, setFilteredSalesPerDay] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0); // Add state for total revenue
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactionsResponse = await fetch('http://localhost:4000/alltransactions');
                const transactionsData = await transactionsResponse.json();
                setTransactions(transactionsData.transactions);

                const salesResponse = await fetch('http://localhost:4000/totalsales');
                const salesData = await salesResponse.json();
                setSales(salesData.sales);

                const salesPerDayResponse = await fetch('http://localhost:4000/totalsalesperday');
                const salesPerDayData = await salesPerDayResponse.json();
                setSalesPerDay(salesPerDayData.totalSalesPerDay);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedDate) {
            const filterTransactionsByDate = (transactions, date) => {
                if (!date) return transactions;
                return transactions.filter(tx => {
                    const transactionDate = new Date(tx.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                    });
                    return transactionDate === date;
                });
            };

            const formattedSelectedDate = selectedDate
                ? new Date(selectedDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                })
                : '';

            const filteredTransactions = filterTransactionsByDate(transactions, formattedSelectedDate);

            const filterSalesPerDayByDate = (salesPerDay, date) => {
                if (!date) return salesPerDay;
                return salesPerDay.filter(sale => {
                    const saleDate = new Date(sale._id).toISOString().split('T')[0];
                    return saleDate === date;
                });
            };

            const filteredSalesPerDay = filterSalesPerDayByDate(salesPerDay, selectedDate);

            // Calculate total revenue for selected date
            // const totalRevenue = filteredSalesPerDay.reduce((sum, sale) => sum + sale.totalRevenue, 0);

            console.log("Filtered Transactions:", filteredTransactions);
            console.log("Filtered Sales Per Day:", filteredSalesPerDay);

            setFilteredTransactions(filteredTransactions);
            setFilteredSalesPerDay(filteredSalesPerDay);
        } else {
            setFilteredTransactions(transactions);
            const totalRevenue = salesPerDay.reduce((sum, sale) => sum + sale.totalRevenue, 0);
            setTotalRevenue(totalRevenue);
        }
    }, [selectedDate, transactions, salesPerDay]);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        console.log("Selected Date:", e.target.value);
    };

    return (
        <div className='bodybody'>
            <h1>Transactions</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <div>
                        <div>
                            <strong>Total Revenue:</strong> Rp {totalRevenue.toLocaleString('id-ID')}
                        </div>
                        <h4>Filter by Date:
                        <input
                            style={{ margin: '0 10px', fontFamily: 'Poppins', fontSize: '14px', color: 'blue' }}
                            type="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            placeholder="Select a date"
                        /></h4>
                        {filteredSalesPerDay.map(sale => {
                            const formattedTotalRevenue = sale.totalRevenue.toLocaleString('id-ID');
                            return (
                                <div key={sale._id} style={{ margin: '20px 0', color:'blue' }}>
                                    <strong>Total Revenue Per Selected Date:</strong> Rp {formattedTotalRevenue}
                                </div>
                            );
                        })}
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Consumer (Email & Name)</th>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(tx => {
                                const formattedDate = new Date(tx.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                });

                                const formattedTotalPrice = tx.totalPrice.toLocaleString('id-ID');

                                return (
                                    <tr key={tx._id}>
                                        <td>{formattedDate}</td>
                                        <td>{tx.userId.name} ({tx.userId.email})</td>
                                        <td>{tx.productId.name}</td>
                                        <td>
                                            <img src={tx.productId.image} alt={tx.productId.name} style={{ width: '50px', height: 'auto' }} />
                                        </td>
                                        <td>{tx.quantity}</td>
                                        <td>Rp {formattedTotalPrice}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <h2>Total Sales Per Product</h2>
                    <ul>
                        {sales.map(sale => {
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
