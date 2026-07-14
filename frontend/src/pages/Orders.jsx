import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api.js';

export default function Orders() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    api.get('/orders/mine').then((res) => setOrders(res.data.orders));
  }, []);

  if (!orders) return <div className="empty-state container">Loading orders…</div>;

  if (orders.length === 0) {
    return (
      <section className="section container">
        <div className="empty-state">
          <h2>No orders yet</h2>
          <p>Once you check out, your orders will show up here.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            Start shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section container">
      <div className="section-head">
        <h2>Your orders</h2>
      </div>
      {orders.map((order) => (
        <div className="summary-card" key={order._id} style={{ marginBottom: 16 }}>
          <div className="summary-row">
            <span style={{ fontWeight: 700 }}>{order.trackingCode}</span>
            <span style={{ textTransform: 'capitalize' }}>{order.status}</span>
          </div>
          <div className="summary-row" style={{ fontFamily: 'var(--font-body)', color: 'var(--muted)' }}>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            <span>{order.items.length} item(s)</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${order.grandTotal.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
