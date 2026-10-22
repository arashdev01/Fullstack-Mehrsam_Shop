import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';

export default function ProductSidebar({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/categories/`).then(res => setCategories(res.data)).catch(() => {});
    axios.get(`${API_URL}/api/products/`).then(res => {
      const data = res.data.results || res.data;
      setLatestProducts(data.slice(0, 3));
    }).catch(() => {});
  }, []);

  const notify = (overrides = {}) => {
    onFilterChange && onFilterChange({
      categories: selectedCategories,
      priceMin, priceMax,
      onlyAvailable,
      ...overrides
    });
  };

  const handleCategoryChange = (id) => {
    const updated = selectedCategories.includes(id)
      ? selectedCategories.filter(c => c !== id)
      : [...selectedCategories, id];
    setSelectedCategories(updated);
    notify({ categories: updated });
  };

  // پلیس‌هولدر محلی — بدون نیاز به اینترنت
  const NO_IMAGE = '/images/products/green-hoodie.png';

  return (
    <div className="w-100">
      {/* گروه‌های محصولات */}
      <div className="accordion filters-container">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button py-2 px-3" type="button"
              data-bs-toggle="collapse" data-bs-target="#sb-cats">
              گروه های محصولات
            </button>
          </h2>
          <div id="sb-cats" className="accordion-collapse collapse show">
            <div className="accordion-body">
              {(categories.length > 0 ? categories : [
                { id: 'hoodie', name: 'هودی' },
                { id: 'pants', name: 'شلوار جین' },
                { id: 'tshirt', name: 'تی‌شرت و پیراهن' },
                { id: 'handbag', name: 'کیف و اکسسوری' },
                { id: 'women-shoes', name: 'کفش' },
              ]).map(cat => (
                <div key={cat.id} className="form-check mb-1">
                  <input className="form-check-input" type="checkbox" id={`cat-${cat.id}`}
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => handleCategoryChange(cat.id)} />
                  <label className="form-check-label" htmlFor={`cat-${cat.id}`}>{cat.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* محدوده قیمت */}
      <div className="accordion filters-container mt-3">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button py-2 px-3" type="button"
              data-bs-toggle="collapse" data-bs-target="#sb-price">
              محدوده قیمت
            </button>
          </h2>
          <div id="sb-price" className="accordion-collapse collapse show">
            <div className="accordion-body">
              <div className="row g-2">
                <div className="col-6">
                  <label className="small text-muted mb-1">از (تومان)</label>
                  <input type="number" className="form-control form-control-sm"
                    placeholder="0"
                    value={priceMin}
                    onChange={e => setPriceMin(e.target.value)} />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">تا (تومان)</label>
                  <input type="number" className="form-control form-control-sm"
                    placeholder="۱۰،۰۰۰،۰۰۰"
                    value={priceMax}
                    onChange={e => setPriceMax(e.target.value)} />
                </div>
                <div className="col-12 text-center mt-2">
                  <button className="btn btn-warning btn-sm rounded-pill px-4"
                    onClick={() => notify()}>
                    اعمال محدوده قیمت
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* فیلترهای ساده */}
      <div className="accordion filters-container mt-3">
        <div className="accordion-item">
          <div className="accordion-body pb-2">
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="only-available"
                checked={onlyAvailable}
                onChange={e => { setOnlyAvailable(e.target.checked); notify({ onlyAvailable: e.target.checked }); }} />
              <label className="form-check-label" htmlFor="only-available">فقط کالاهای موجود</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="only-warranty" />
              <label className="form-check-label" htmlFor="only-warranty">فقط کالاهای دارای گارانتی</label>
            </div>
          </div>
        </div>
      </div>

      {/* جدیدترین محصولات */}
      {latestProducts.length > 0 && (
        <div className="accordion filters-container mt-3">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button py-2 px-3" type="button"
                data-bs-toggle="collapse" data-bs-target="#sb-latest">
                جدیدترین محصولات
              </button>
            </h2>
            <div id="sb-latest" className="accordion-collapse collapse show">
              <div className="accordion-body px-2">
                {latestProducts.map(product => (
                  <Link key={product.id} to={`/product/${product.id}`}
                    className="text-decoration-none">
                    <div className="side-product mb-2 p-2"
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                      <img
                        src={product.image ? (product.image.startsWith('http') ? product.image : API_URL + product.image) : NO_IMAGE}
                        onError={e => e.target.src = NO_IMAGE}
                        alt={product.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover',
                          borderRadius: '6px', flexShrink: 0 }}
                      />
                      <div style={{ overflow: 'hidden', minWidth: 0 }}>
                        <div style={{
                          fontSize: '12px', fontWeight: 'bold', color: '#333',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                        }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#6b459b' }}>
                          {Number(product.price).toLocaleString('fa-IR')} تومان
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}