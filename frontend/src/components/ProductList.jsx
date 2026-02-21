import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation } from 'react-router-dom';
import ProductSidebar from './ProductSidebar';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({

    category: null,
    max_price: null,
    brands: []

  }); // اضافه شد برای جلوگیری از خطا
  const { categoryId } = useParams();
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    let url = 'http://127.0.0.1:8000/api/products/';
    
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');

    const params = {};
    if (categoryId) params.category = categoryId;
    if (search) params.search = search;

    axios.get(url, { params })
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("خطا:", error);
        setLoading(false);
      });
  }, [categoryId, location.search]);

  if (loading) return <div className="text-center mt-5">در حال بارگذاری...</div>;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const sortProducts = (type) => {
    const sorted = [...products].sort((a, b) => {
      if (type === 'cheap') return a.price - b.price;
      return b.price - a.price;
    });
    setProducts(sorted);
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        
        {/* ۱. سایدبار */}
        <div className="col-12 col-lg-3">
          <ProductSidebar onFilterChange={setFilters} />
        </div>

        {/* ۲. لیست محصولات */}
        <div className="col-12 col-lg-9">
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold mb-0">
              {categoryId ? "محصولات این دسته" : "همه محصولات"}
            </h4>
            
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => sortProducts('expensive')}>گران‌ترین</button>
              <button className="btn btn-sm btn-outline-primary rounded-pill px-3" onClick={() => sortProducts('cheap')}>ارزان‌ترین</button>
            </div>
          </div>

          <div className="row">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 mb-4 text-end">
                  <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                    <img 
                      src={product.image || '/images/no-image.png'} 
                      className="card-img-top" 
                      alt={product.name} 
                      style={{ height: '220px', objectFit: 'cover' }} 
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title fw-bold text-truncate mb-3">{product.name}</h6>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="text-primary fw-bold small">{formatPrice(product.price)} تومان</span>
                          {product.stock > 0 ? (
                            <span className="badge bg-success-subtle text-success rounded-pill small">موجود: {product.stock}</span>
                          ) : (
                            <span className="badge bg-danger-subtle text-danger rounded-pill small">ناموجود</span>
                          )}
                        </div>
                        
                        <Link 
                          to={`/product/${product.id}`} 
                          className={`btn rounded-pill w-100 ${product.stock > 0 ? 'btn-primary' : 'btn-secondary disabled'}`}
                        >
                          {product.stock > 0 ? 'مشاهده و خرید' : 'اتمام موجودی'}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p className="lead">محصولی پیدا نشد.</p>
                <Link to="/" className="btn btn-outline-secondary">بازگشت به همه محصولات</Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}