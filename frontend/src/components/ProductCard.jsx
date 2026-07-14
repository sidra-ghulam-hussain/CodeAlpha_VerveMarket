import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const lowStock = product.stock > 0 && product.stock <= 5;
  const outOfStock = product.stock === 0;

  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-card-media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <span className="product-card-name">{product.name}</span>
        <span className="product-card-tagline">{product.tagline}</span>
        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          {outOfStock && <span className="stock-flag">Sold out</span>}
          {lowStock && <span className="stock-flag">Only {product.stock} left</span>}
        </div>
      </div>
    </Link>
  );
}
