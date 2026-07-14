import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Cart() {
  const { items, updateQuantity, removeItem, itemsTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shipping = itemsTotal >= 75 || itemsTotal === 0 ? 0 : 6.5;
  const total = itemsTotal + shipping;

  if (items.length === 0) {
    return (
      <section className="section container">
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Nothing added yet — go find something worth tagging.</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            Browse the catalog
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section container">
      <div className="section-head">
        <h2>Your cart</h2>
      </div>
      <div className="cart-layout">
        <div>
          {items.map((item) => (
            <div className="cart-line" key={item.productId}>
              <img src={item.image} alt={item.name} />
              <div>
                <div className="cart-line-name">{item.name}</div>
                <div className="cart-line-price">${item.price.toFixed(2)} each</div>
                <div className="qty-control" style={{ marginTop: 8, width: 'fit-content' }}>
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, Math.min(item.stock, item.quantity + 1))}
                  >
                    +
                  </button>
                </div>
                <button className="remove-link" onClick={() => removeItem(item.productId)}>
                  Remove
                </button>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="summary-card">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${itemsTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="btn btn-primary btn-block"
            style={{ marginTop: 16 }}
            onClick={() => navigate(user ? '/checkout' : '/login')}
          >
            {user ? 'Checkout' : 'Sign in to checkout'}
          </button>
        </div>
      </div>
    </section>
  );
}
