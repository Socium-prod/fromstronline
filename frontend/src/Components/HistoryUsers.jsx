import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/history.css";
import { useAuth } from "../Context/Authcontext";


const url = 'http://127.0.0.1:5000'
const liveurl = 'https://online-store-backend-plct.onrender.com'



function HistoryUsers() {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [histories, setHistories] = useState([]);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("date");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${liveurl}/history/${user.id}`)
            .then((response) => {
                setHistories(response.data);
                setError("");
            })
            .catch((error) => {
                console.error("Error fetching histories:", error);
                setError("Failed to load histories. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user.id]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const filteredHistories = histories
        .filter((history) =>
            history.product_name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "date") return new Date(b.purchase_date) - new Date(a.purchase_date);
            if (sortBy === "price") return b.price - a.price;
            return 0;
        });

    return (
        <div className="history-container">
            <div className="history-page-navbar">
                <div className="user-name">
                    Welcome, <span className="highlight">{user.lastname}</span> to Socium!
                </div>
                <div className="history-nav">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="date">Sort by Date</option>
                    <option value="price">Sort by Price</option>
                </select>
            </div>

            {loading ? (
                <div className="message">Loading...</div>
            ) : error ? (
                <div className="message error">Error: {error}</div>
            ) : filteredHistories.length === 0 ? (
                <div className="message">
                    <h1>Your order history is empty!</h1>
                    <button onClick={() => navigate("/")}>Go to Home Page</button>
                </div>
            ) : (
                <div className="histories">
                    <div className="history-header">
                        <div>Order ID</div>
                        <div>Transaction ID</div>
                        <div>Product</div>
                        <div>Quantity</div>
                        <div>Price</div>
                        <div>Purchase Date</div>
                    </div>
                    {filteredHistories.map((history, index) => (
                        <div className="history-items" key={index}>
                            <div>{history.id}</div>
                            <div>{history.transaction_id}</div>
                            <div>{history.product_name}</div>
                            <div>{history.quantity}</div>
                            <div>${history.price}</div>
                            <div>{history.purchase_date}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HistoryUsers;
