import React, { useState } from 'react'
import axios from 'axios'
import '../Styles/Admin.css'



const url = 'http://127.0.0.1:5000'
const liveurl = 'https://online-store-backend-plct.onrender.com'


function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('customers');
  const [customers, setCustomers] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${liveurl}/api/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${liveurl}/api/orders`);
      setOrderHistory(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    if (tab === 'customers') {
      fetchCustomers();
    } else {
      fetchOrders();
    }
  };

  return (
    <div className='admin-container'>
        <div className="selection-panel">
            <button
              className={selectedTab === 'customers' ? 'active' : ''}
              onClick={() => handleTabClick('customers')}
            >
              Customers
            </button>
            <button
              className={selectedTab === 'orders' ? 'active' : ''}
              onClick={() => handleTabClick('orders')}
            >
              Orders
            </button>
        </div>
        <div className="details-panel">
          {selectedTab === 'customers' && (
            <div className="customers-list">
              <h2>Customers</h2>
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.firstname}</td>
                      <td>{customer.lastname}</td>
                      <td>{customer.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {selectedTab === 'orders' && (
            <div className="order-history">
              <h2>Order History</h2>
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Transaction ID</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Purchase Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orderHistory.map((order) => (
                    <tr key={order.id}>
                      <td>{order.product_name}</td>
                      <td>{order.transaction_id}</td>
                      <td>{order.price}</td>
                      <td>{order.quantity}</td>
                      <td>{new Date(order.purchase_date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
    </div>
  )
}

export default AdminDashboard;
