import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // اگر جنگو فیلد featured داشت از این استفاده کن
    // اگه نه، اولین 4 محصول رو نشون میده
    axios.get('http://127.0.0.1:8000/api/products/?featured=true')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setProducts(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => {
        axios.get('http://127.0.0.1:8000/api/products/')
          .then(res => {
            const data = Array.isArray(res.data) ? res.data : res.data.results || [];
            setProducts(data.slice(0, 4));
            setLoading(false);
          });
      });
  }, []);

  const formatPrice = (price) => new Intl.NumberFormat('fa-IR').format(price);

  
  if (products.length === 0) return null;

  return (
    <section className="container mt-5">
      <h4 className="fw-bold text-end mb-4 border-bottom pb-2">محصولات ویژه</h4>
      <div className="row g-3">
        {products.map(product => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
                style={{ height: '220px', objectFit: 'cover' }}
                    onError={e => e.target.src='/images/no-image.svg'}              />
              <div className="card-body text-end">
                <h6 className="fw-bold text-truncate">{product.name}</h6>
                <p className="text-primary fw-bold mb-2">{formatPrice(product.price)} تومان</p>
                {product.stock > 0 ? (
                  <span className="badge bg-success-subtle text-success rounded-pill mb-2">موجود</span>
                ) : (
                  <span className="badge bg-danger-subtle text-danger rounded-pill mb-2">ناموجود</span>
                )}
                <Link
                  to={`/product/${product.id}`}
                  className={`btn rounded-pill w-100 btn-sm ${product.stock > 0 ? 'btn-primary' : 'btn-secondary disabled'}`}
                >
                  {product.stock > 0 ? 'مشاهده و خرید' : 'اتمام موجودی'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}