import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import ProductSidebar from './ProductSidebar';
import API_URL from '../api';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [],
    priceMin: '',
    priceMax: '',
    onlyAvailable: false,
  });
  const [filterOpen, setFilterOpen] = useState(false);

  const { categoryId } = useParams();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const url = `${API_URL}/api/products/`;
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    const params = {};

    if (categoryId) params['category__slug'] = categoryId;
    if (search) params.search = search;

    axios.get(url, { params })
      .then(response => {
        const data = response.data.results || response.data;
        // Keep raw API payloads out of the customer browser console.
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('خطا:', error);
        setProducts([]);
        setLoading(false);
      });
  }, [categoryId, location.search]);

  const formatPrice = price => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const sortProducts = type => {
    const sorted = [...products].sort((a, b) => {
      if (type === 'cheap') return Number(a.price) - Number(b.price);
      return Number(b.price) - Number(a.price);
    });

    setProducts(sorted);
  };

  const filteredProducts = products.filter(product => {
    const selectedCategories = filters.categories || [];

    if (
      selectedCategories.length > 0 &&
      !selectedCategories.some(
        categoryId => Number(categoryId) === Number(product.category?.id) || String(categoryId) === String(product.category?.slug)
      )
    ) {
      return false;
    }

    if (
      filters.priceMin !== '' &&
      Number(product.price) < Number(filters.priceMin)
    ) {
      return false;
    }

    if (
      filters.priceMax !== '' &&
      Number(product.price) > Number(filters.priceMax)
    ) {
      return false;
    }

    if (filters.onlyAvailable && Number(product.stock) <= 0) {
      return false;
    }

    return true;
  });

  if (loading) {
    return <div className="text-center mt-5">در حال بارگذاری...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row g-4">

        {/* سایدبار دسکتاپ */}
        <div className="col-12 col-lg-3 d-none d-lg-block">
          <ProductSidebar onFilterChange={setFilters} />
        </div>

        {/* دکمه فیلتر موبایل */}
        <div className="col-12 d-lg-none">
          <button
            type="button"
            className="btn btn-outline-primary rounded-pill w-100"
            onClick={() => setFilterOpen(true)}
          >
            ☰ فیلترها
          </button>
        </div>

        {/* پنل فیلتر موبایل */}
        {filterOpen && (
          <div
            className="d-lg-none position-fixed top-0 start-0 w-100 h-100"
            style={{
              zIndex: 1050,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
            }}
            onClick={() => setFilterOpen(false)}
          >
            <div
              className="bg-white h-100"
              style={{
                width: '85%',
                maxWidth: '360px',
                overflowY: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <h5 className="mb-0 fw-bold">فیلترها</h5>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="بستن"
                  onClick={() => setFilterOpen(false)}
                />
              </div>

              <div className="p-3">
                <ProductSidebar onFilterChange={setFilters} />
              </div>
            </div>
          </div>
        )}

        {/* لیست محصولات */}
        <div className="col-12 col-lg-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">
              {categoryId ? 'محصولات این دسته' : 'همه محصولات'}
            </h4>

            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-primary rounded-pill px-3"
                onClick={() => sortProducts('expensive')}
              >
                گران‌ترین
              </button>

              <button
                className="btn btn-sm btn-outline-primary rounded-pill px-3"
                onClick={() => sortProducts('cheap')}
              >
                ارزان‌ترین
              </button>
            </div>
          </div>

          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="col-6 col-sm-6 col-md-4 mb-3 text-end"
                >
                  <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                    <img
                      src={product.image ? (product.image.startsWith('http') ? product.image : `${API_URL}${product.image}`) : '/images/products/green-hoodie.png'}
                      onError={e => {
                        e.currentTarget.src = '/images/products/green-hoodie.png';
                      }}
                      className="card-img-top"
                      alt={product.name}
                      style={{
                        height: '220px',
                        objectFit: 'contain', background: '#fbf7ef',
                      }}
                    />

                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title fw-bold text-truncate mb-3">
                        {product.name}
                      </h6>

                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-primary fw-bold small">
                            {formatPrice(product.price)} تومان
                          </span>

                          {Number(product.stock) > 0 ? (
                            <span className="badge bg-success-subtle text-success rounded-pill small">
                              موجود: {product.stock}
                            </span>
                          ) : (
                            <span className="badge bg-danger-subtle text-danger rounded-pill small">
                              ناموجود
                            </span>
                          )}
                        </div>

                        <Link
                          to={`/product/${product.id}`}
                          className={`btn rounded-pill w-100 ${
                            Number(product.stock) > 0
                              ? 'btn-primary'
                              : 'btn-secondary disabled'
                          }`}
                        >
                          {Number(product.stock) > 0
                            ? 'مشاهده و خرید'
                            : 'اتمام موجودی'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="lead">محصولی پیدا نشد.</p>

                <Link
                  to="/products"
                  className="btn btn-outline-secondary"
                >
                  بازگشت به همه محصولات
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}