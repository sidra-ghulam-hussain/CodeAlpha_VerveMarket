import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setProduct(res.data.product));
  }, [id]);

  if (!product) return <div className="empty-state container">Loading product…</div>;

  const outOfStock = product.stock === 0;

  return (
    <section className="section container">
      <div className="detail-grid">
        <div className="detail-media">
          <img src={product.image} alt={product.name} />
        </div>
        <div>
          <div className="detail-category">{product.category}</div>
          <h1 className="detail-name">{product.name}</h1>
          <p className="detail-tagline">{product.tagline}</p>
          <p className="detail-description">{product.description}</p>

          <div className="price-tag" style={{ transform: 'rotate(-1deg)' }}>
            <span className="tag-label">SKU {product.sku}</span>
            <span className="tag-price">${product.price.toFixed(2)}</span>
            {product.compareAtPrice && (
              <span className="tag-compare">${product.compareAtPrice.toFixed(2)}</span>
            )}
          </div>

          {!outOfStock && (
            <div className="qty-row">
              <div className="qty-control">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>+</button>
              </div>
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{product.stock} in stock</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button
              className="btn btn-primary"
              disabled={outOfStock}
              onClick={() => {
                addItem(product, qty);
                setAdded(true);
                setTimeout(() => setAdded(false), 1800);
              }}
            >
              {outOfStock ? 'Sold out' : added ? 'Added ✓' : 'Add to cart'}
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/cart')}>
              View cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
