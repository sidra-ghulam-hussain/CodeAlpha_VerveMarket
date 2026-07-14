import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api.js';

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => setOrder(res.data.order));
  }, [id]);

  if (!order) return <div className="empty-state container">Loading order…</div>;

  return (
    <div className="confirm-shell">
      <div className="hero-eyebrow" style={{ justifyContent: 'center', display: 'flex' }}>
        Order confirmed
      </div>
      <h1>Thanks — it's on its way to being packed.</h1>
      <p style={{ color: 'var(--muted)', marginTop: 10 }}>
        We've emailed a receipt. Track this order any time with the code below.
      </p>
      <div className="tracking-chip">{order.trackingCode}</div>
      <div className="summary-card" style={{ textAlign: 'left', marginTop: 20 }}>
        {order.items.map((i) => (
          <div className="summary-row" key={i.product}>
            <span>{i.name} × {i.quantity}</span>
            <span>${(i.price * i.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-row total">
          <span>Total</span>
          <span>${order.grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 24 }}>
        Continue shopping
      </Link>
    </div>
  );
}
