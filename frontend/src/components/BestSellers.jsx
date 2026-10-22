import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_URL from '../api';

const formatPrice = value => new Intl.NumberFormat('fa-IR').format(Number(value) || 0);
const imageUrl = image => {
  if (!image) return '/images/products/green-hoodie.png';
  return /^https?:\/\//i.test(image) ? image : API_URL + (image.startsWith('/') ? image : '/' + image);
};

export default function BestSellers() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let mounted = true;
    axios.get(API_URL + '/api/products/')
      .then(response => {
        const result = response.data.results || response.data;
        if (mounted) setProducts(Array.isArray(result) ? result : []);
      })
      .catch(() => {
        if (mounted) setHasError(true);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const categories = useMemo(() => {
    const groups = new Map();
    products.forEach(product => {
      const category = product.category;
      if (category) {
        const key = String(category.slug || category.id || category.name);
        if (!groups.has(key)) groups.set(key, { key, label: category.name || 'دسته‌بندی' });
      }
    });
    return Array.from(groups.values()).slice(0, 5);
  }, [products]);

  const visibleProducts = activeCategory === 'all'
    ? products
    : products.filter(product => String(product.category?.slug || product.category?.id || product.category?.name) === activeCategory);

  return (
    <section id="best-sellers" className="pt-3 pt-md-4" dir="rtl">
      <style>{\`
        #best-sellers .seller-tabs { display:flex; gap:8px; overflow-x:auto; padding:4px 2px 10px; scrollbar-width:thin; }
        #best-sellers .seller-tab { flex:0 0 auto; border:1px solid #e8deed; border-radius:999px; padding:7px 14px; background:#fff; color:#51465d; font-size:13px; }
        #best-sellers .seller-tab.active { background:#6b459b; border-color:#6b459b; color:#fff; }
        #best-sellers .seller-card { overflow:hidden; height:100%; display:flex; flex-direction:column; border:1px solid #e8deed; border-radius:16px; background:#fff; box-shadow:0 5px 20px rgba(52,44,61,.045); transition:transform .2s, box-shadow .2s; }
        #best-sellers .seller-card:hover { transform:translateY(-3px); box-shadow:0 12px 28px rgba(107,69,155,.12); }
        #best-sellers .seller-media { height:200px; padding:12px; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg,#fff 0%,#fbf7ef 100%); }
        #best-sellers .seller-media img { width:100%; height:100%; object-fit:contain; mix-blend-mode:multiply; }
        #best-sellers .seller-body { display:flex; flex:1; flex-direction:column; padding:12px; gap:8px; }
        #best-sellers .seller-name { display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; overflow:hidden; min-height:42px; color:#342c3d; font-weight:700; font-size:13px; line-height:1.7; text-decoration:none; }
        #best-sellers .seller-price { color:#6b459b; font-weight:800; font-size:13px; }
        #best-sellers .seller-stock { color:#6d7569; font-size:11px; }
        #best-sellers .seller-action { margin-top:auto; display:block; text-align:center; border-radius:999px; padding:7px 10px; color:#fff; background:#6b459b; font-size:12px; text-decoration:none; }
        #best-sellers .seller-tab:focus-visible { outline:3px solid #f2b79f; outline-offset:2px; }
        #best-sellers .seller-media:focus-visible { outline:3px solid #f2b79f; outline-offset:-3px; }
        #best-sellers .seller-action:hover { color:#fff; background:#513276; }
        #best-sellers .seller-name:hover { color:#6b459b; }
        #best-sellers .seller-stock::before { content:''; display:inline-block; width:6px; height:6px; border-radius:50%; background:#a5bd9c; margin-inline-end:5px; }
        #best-sellers .seller-tabs::-webkit-scrollbar { height:4px; }
        #best-sellers .seller-tabs::-webkit-scrollbar-thumb { background:#d6c7e2; border-radius:99px; }
        #best-sellers .seller-price, #best-sellers .seller-stock { white-space:nowrap; }
        #best-sellers .seller-media img { object-position:center; }
        @media(max-width:575px) { #best-sellers .seller-media { height:148px; padding:8px; } #best-sellers .seller-body { padding:9px; gap:6px; } #best-sellers .seller-name { font-size:12px; min-height:40px; } #best-sellers .seller-price { font-size:12px; } }
        @media(prefers-reduced-motion:reduce) { #best-sellers .seller-card { transition:none; } }
      \`}</style>
      <div className="container">
        <div className="d-flex align-items-end justify-content-between gap-2 mb-3">
          <div>
            <span className="small text-muted">انتخاب‌های دوست‌داشتنی شما</span>
            <h2 className="section-title text-end mb-0">منتخب مهرسام جینز</h2>
          </div>
          <Link to="/products" className="small text-decoration-none fw-bold">همه محصولات ←</Link>
        </div>
        <div className="seller-tabs" role="tablist" aria-label="فیلتر دسته‌بندی محصولات">
          <button type="button" role="tab" aria-selected={activeCategory === 'all'} className={'seller-tab' + (activeCategory === 'all' ? ' active' : '')} onClick={() => setActiveCategory('all')}>همه</button>
          {categories.map(category => (
            <button key={category.key} type="button" role="tab" aria-selected={activeCategory === category.key} className={'seller-tab' + (activeCategory === category.key ? ' active' : '')} onClick={() => setActiveCategory(category.key)}>{category.label}</button>
          ))}
        </div>
        {loading && <p className="text-center text-muted py-4" role="status">در حال دریافت محصولات...</p>}
        {!loading && hasError && <p className="text-center text-muted py-4" role="status">دریافت محصولات موقتاً ممکن نیست.</p>}
        {!loading && !hasError && visibleProducts.length === 0 && <p className="text-center text-muted py-4">فعلاً محصولی در این دسته ثبت نشده است.</p>}
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-2 g-md-3">
          {visibleProducts.slice(0, 8).map(product => (
            <div key={product.id} className="col">
              <article className="seller-card">
                <Link to={'/product/' + product.id} className="seller-media" aria-label={'مشاهده ' + product.name}>
                  <img src={imageUrl(product.image)} alt={product.name} loading="lazy" onError={event => { event.currentTarget.src = '/images/products/green-hoodie.png'; }} />
                </Link>
                <div className="seller-body">
                  <Link to={'/product/' + product.id} className="seller-name">{product.name}</Link>
                  <div className="seller-price">{formatPrice(product.price)} تومان</div>
                  <div className="seller-stock">{Number(product.stock) > 0 ? 'آماده ارسال' : 'ناموجود'}</div>
                  <Link to={'/product/' + product.id} className="seller-action">{Number(product.stock) > 0 ? 'مشاهده محصول' : 'جزئیات محصول'}</Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}