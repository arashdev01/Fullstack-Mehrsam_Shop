import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';

const productImage = image => {
  if (!image) return '/images/products/green-hoodie.png';
  return /^https?:\/\//i.test(image) ? image : API_URL + (image.startsWith('/') ? image : '/' + image);
};

const formatPrice = price => new Intl.NumberFormat('fa-IR').format(Number(price) || 0);

const saleStyles = [
  '#on-sale {',
  '  padding: 18px 0 24px;',
  '  margin: 0 12px;',
  '  border-radius: 18px;',
  '  background: linear-gradient(135deg,#ede4f5,#fbf7ef);',
  '}',

  '#on-sale .sale-card {',
  '  height: 100%; overflow: hidden; border: 1px solid #e8deed;',
  '  border-radius: 16px; background: #fff;',
  '  box-shadow: 0 5px 18px rgba(52,44,61,.05);',
  '  transition: transform .18s, box-shadow .18s;',
  '}',

  '#on-sale .sale-card:hover {',
  '  transform: translateY(-3px);',
  '  box-shadow: 0 12px 25px rgba(107,69,155,.13);',
  '}',

  '#on-sale .sale-media {',
  '  height: 190px; display: flex; align-items: center;',
  '  justify-content: center; padding: 12px; background: #fff;',
  '}',

  '#on-sale .sale-media img { width: 100%; height: 100%; object-fit: contain; }',
  '#on-sale .sale-name {',
  '  display: -webkit-box; min-height: 44px; overflow: hidden;',
  '  -webkit-box-orient: vertical; -webkit-line-clamp: 2;',
  '  color: #342c3d; font-weight: 700; font-size: 13px;',
  '  line-height: 1.7; text-decoration: none;',
  '}',

  '#on-sale .sale-price { color: #6b459b; font-size: 13px; font-weight: 800; white-space: nowrap; }',
  '#on-sale .sale-action {',
  '  display: block; margin-top: 10px; padding: 7px 10px;',
  '  border-radius: 999px; background: #6b459b; color: #fff;',
  '  font-size: 12px; text-align: center; text-decoration: none;',
  '}',

  '#on-sale .sale-action:hover { background: #513276; color: #fff; }',
  '#on-sale .sale-meta { color: #77806f; font-size: 11px; }',
  '#on-sale .sale-media:focus-visible, #on-sale .sale-action:focus-visible { outline: 3px solid #f2b79f; outline-offset: 2px; }',
  '@media (max-width: 575px) {',
  '  #on-sale { margin: 0 8px; padding: 12px 0 16px; }',
  '  #on-sale .sale-media { height: 145px; padding: 8px; }',
  '  #on-sale .sale-body { padding: 9px; }',
  '  #on-sale .sale-name { min-height: 40px; font-size: 12px; }',
  '  #on-sale .sale-price { font-size: 12px; }',
  '}',

  '@media (prefers-reduced-motion: reduce) { #on-sale .sale-card { transition: none; } }'
].join('\n');

export default function OnSaleTimer() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let active = true;
    axios.get(API_URL + '/api/products/')
      .then(response => {
        const data = response.data.results || response.data;
        if (active) setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (active) setHasError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <section id="on-sale" dir="rtl">
      <style>{saleStyles}</style>
      <div className="container">
        <div className="d-flex align-items-end justify-content-between gap-2 mb-3">
          <div>
            <span className="small text-muted">برای استایل روزمره</span>
            <h2 className="section-title text-end mb-0">انتخاب‌های مهرسام</h2>
          </div>
          <Link to="/products" className="small fw-bold text-decoration-none">همه محصولات ←</Link>

        </div>
        {loading && <p className="text-center text-muted py-4" role="status">در حال دریافت محصولات...</p>}
        {!loading && hasError && <p className="text-center text-muted py-4" role="status">فعلاً امکان دریافت محصولات وجود ندارد.</p>}
        {!loading && !hasError && products.length === 0 && <p className="text-center text-muted py-4">محصولی برای نمایش ثبت نشده است.</p>}

        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2 g-md-3">
          {products.slice(0, 4).map(product => (
            <div key={product.id} className="col">
              <article className="sale-card">
                <Link to={'/product/' + product.id} className="sale-media" aria-label={'مشاهده ' + product.name}>

                  <img src={productImage(product.image)} alt={product.name} loading="lazy"
                    onError={event => { event.currentTarget.src = '/images/products/green-hoodie.png'; }} />
                </Link>
                <div className="sale-body p-2 p-md-3 text-end">
                  <Link to={'/product/' + product.id} className="sale-name">{product.name}</Link>
                  <div className="sale-price mt-2">{formatPrice(product.price)} تومان</div>
                  <div className="sale-meta mt-1">{Number(product.stock) > 0 ? 'آماده ارسال' : 'ناموجود'}</div>
                  <Link to={'/product/' + product.id} className="sale-action">
                    {Number(product.stock) > 0 ? 'مشاهده محصول' : 'جزئیات محصول'}
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}