import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Checkout() {
  const { items, itemsTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    line1: user?.address?.line1 || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    postalCode: user?.address?.postalCode || '',
    country: user?.address?.country || ''
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const shipping = itemsTotal >= 75 ? 0 : 6.5;
  const total = itemsTotal + shipping;

  function updateField(field, value) {
    setAddress((prev) => ({ ...prev, [field]: value }));
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const res = await api.post('/orders', {
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        shippingAddress: address
      });
      clearCart();
      navigate(`/order-confirmation/${res.data.order._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place your order.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section container">
      <div className="section-head">
        <h2>Checkout</h2>
      </div>
      <div className="cart-layout">
        <form onSubmit={handlePlaceOrder}>
          {error && <div className="form-error">{error}</div>}
          <h3 style={{ marginBottom: 14 }}>Shipping address</h3>
          <div className="field">
            <label>Street address</label>
            <input required value={address.line1} onChange={(e) => updateField('line1', e.target.value)} />
          </div>
          <div className="field-row">
            <div className="field">
              <label>City</label>
              <input required value={address.city} onChange={(e) => updateField('city', e.target.value)} />
            </div>
            <div className="field">
              <label>State / Province</label>
              <input required value={address.state} onChange={(e) => updateField('state', e.target.value)} />
            </div>
          </div>
          <div className="field-row">
            <div className="field">
              <label>Postal code</label>
              <input
                required
                value={address.postalCode}
                onChange={(e) => updateField('postalCode', e.target.value)}
              />
            </div>
            <div className="field">
              <label>Country</label>
              <input required value={address.country} onChange={(e) => updateField('country', e.target.value)} />
            </div>
          </div>
          <button className="btn btn-primary btn-block" disabled={busy} style={{ marginTop: 8 }}>
            {busy ? 'Placing order…' : `Place order — $${total.toFixed(2)}`}
          </button>
        </form>

        <div className="summary-card">
          <h3 style={{ marginBottom: 14, fontSize: '1rem' }}>Order summary</h3>
          {items.map((i) => (
            <div className="summary-row" key={i.productId}>
              <span>
                {i.name} × {i.quantity}
              </span>
              <span>${(i.price * i.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
