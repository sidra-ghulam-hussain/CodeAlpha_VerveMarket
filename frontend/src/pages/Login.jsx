import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not sign in.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-shell">
      <h2 style={{ marginBottom: 6 }}>Welcome back</h2>
      <p style={{ color: 'var(--muted)', marginBottom: 22, fontSize: '0.9rem' }}>
        Sign in to check out and track your orders.
      </p>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p style={{ marginTop: 18, fontSize: '0.88rem', color: 'var(--muted)' }}>
        New here? <Link to="/register" style={{ color: 'var(--signal)', fontWeight: 600 }}>Create an account</Link>
      </p>
    </div>
  );
}
