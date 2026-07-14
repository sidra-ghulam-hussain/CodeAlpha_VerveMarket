import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">Verve</span>
          <span>Market</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Shop</Link>
          {user && <Link to="/orders">Orders</Link>}
          {user ? (
            <>
              <span style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>Hi, {user.name.split(' ')[0]}</span>
              <button
                className="btn btn-ghost"
                style={{ padding: '8px 14px' }}
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-ghost" style={{ padding: '8px 14px' }}>
              Sign in
            </Link>
          )}
          <Link to="/cart" className="cart-badge">
            Cart · {itemCount}
          </Link>
        </nav>
      </div>
    </header>
  );
}
