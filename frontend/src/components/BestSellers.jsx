import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';

const tabs = [
  { key: 'all', label: 'همه پوشاک' },
  { key: 'denim', label: 'جین و شلوار' },
  { key: 'tops', label: 'پیراهن و تیشرت' },
  { key: 'outerwear', label: 'هودی و کت' },
];

const getCategoryText = (product) => {
  const category = product.category;
  return typeof category === 'object'
    ? `${category?.name || ''} ${category?.slug || ''}`
    : String(category || '');
};

const matchesTab = (product, key) => {
  if (key === 'all') return true;
  const text = `${product.name || ''} ${product.slug || ''} ${getCategoryText(product)}`.toLowerCase();
  if (key === 'denim') return /جین|شلوار|jean|denim/.test(text);
  if (key === 'tops') return /تیشرت|تی‌شرت|پیراهن|shirt|tee/.test(text);
  return /هودی|سویشرت|کت|کاپشن|hoodie|jacket/.test(text);
};

const formatPrice = (price) => new Intl.NumberFormat('fa-IR').format(Number(price) || 0);

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState('all');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    axios.get(`${API_URL}/api/products/`)
      .then(({ data }) => {
        const items = Array.isArray(data) ? data : data?.results || [];
        if (mounted) setProducts(items);
      })
      .catch((error) => {
        console.error('خطا در دریافت محصولات پرفروش:', error);
        if (mounted) setProducts([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);
  const visibleProducts = useMemo(
    () => products.filter((product) => matchesTab(product, active)).slice(0, 8),
    [products, active],
  );
  if (loading) return null;
  return (
    <section id="best-sellers" className="ms-best-sellers py-4 py-md-5">
      <div className="container">
        <div className="d-flex align-items-end justify-content-between gap-3 flex-wrap mb-3">
          <div>
            <span className="ms-eyebrow">MEHRSAM JEANS</span>
            <h2 className="section-title text-end mb-1">پیشنهادهای مهرسام</h2>
            <p className="text-muted mb-0">انتخاب‌هایی برای استایل روزمره و جین</p>
          </div>
          <Link to="/products" className="ms-view-all">مشاهده همه محصولات ←</Link>
        </div>
        <div className="ms-product-tabs d-flex gap-2 overflow-auto pb-2 mb-3" role="group" aria-label="فیلتر پوشاک">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`ms-product-tab ${active === tab.key ? 'active' : ''}`}
              aria-pressed={active === tab.key}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {visibleProducts.length === 0 ? (
          <div className="ms-empty-products text-center py-4">
            <p className="mb-2">{products.length ? 'در این گروه محصولی پیدا نشد.' : 'فعلاً محصولی برای نمایش در دسترس نیست.'}</p>
            <Link to="/products">رفتن به فروشگاه</Link>
          </div>
        ) : (
          <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-2 g-md-3">
            {visibleProducts.map((product) => (
              <div className="col" key={product.id}>
                <article className="ms-product-card h-100">
                  <Link to={`/product/${product.id}`} className="ms-product-image">
                    <img
                      src={product.image || '/images/user-no-image.jpg'}
                      alt={product.name}
                      loading="lazy"
                      onError={(event) => { event.currentTarget.src = '/images/user-no-image.jpg'; }}
                    />
                  </Link>
                  <div className="ms-product-info">
                    <span className="ms-product-category">{getCategoryText(product).trim() || 'پوشاک'}</span>
                    <Link to={`/product/${product.id}`} className="ms-product-name">{product.name}</Link>
                    <div className="ms-product-price">{formatPrice(product.price)} <small>تومان</small></div>
                    <span className={`ms-stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                      {product.stock > 0 ? 'موجود در انبار' : 'ناموجود'}
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
