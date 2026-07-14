import { useEffect, useState } from 'react';
import api from '../api/api.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products/categories').then((res) => setCategories(res.data.categories));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory) params.category = activeCategory;
    if (search) params.search = search;
    if (sort) params.sort = sort;

    const timeout = setTimeout(() => {
      api
        .get('/products', { params })
        .then((res) => setProducts(res.data.products))
        .finally(() => setLoading(false));
    }, 250);

    return () => clearTimeout(timeout);
  }, [activeCategory, search, sort]);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-eyebrow">Boutique goods, plainly priced</div>
            <h1>No markdowns. No mystery pricing. Just good things, honestly tagged.</h1>
            <p>
              Verve Market carries a small, considered catalog — apparel, home goods, and everyday
              carry from makers who don't cut corners. Every price tag tells the truth.
            </p>
            <div className="hero-actions">
              <a href="#catalog" className="btn btn-primary">
                Browse the catalog
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="price-tag">
              <span className="tag-label">Drift Wool Throw</span>
              <span className="tag-price">$89.00</span>
              <span className="tag-compare">$110.00</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section container" id="catalog">
        <div className="section-head">
          <div>
            <div className="eyebrow">Catalog</div>
            <h2>Everything in stock</h2>
          </div>
        </div>

        <div className="filters">
          <input
            className="search-input"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={`filter-pill ${activeCategory === '' ? 'active' : ''}`}
            onClick={() => setActiveCategory('')}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-pill ${activeCategory === c ? 'active' : ''}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
          <select className="search-input" style={{ maxWidth: 180 }} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>

        {loading ? (
          <div className="empty-state">Loading products…</div>
        ) : products.length === 0 ? (
          <div className="empty-state">Nothing matches that search. Try another term or category.</div>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
