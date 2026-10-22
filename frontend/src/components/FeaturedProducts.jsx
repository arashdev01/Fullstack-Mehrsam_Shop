import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products/`);
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error('خطا در دریافت محصولات ویژه:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatPrice = price => new Intl.NumberFormat('fa-IR').format(price);

  if (loading || products.length === 0) return null;

  return (
    <section className="container mt-3 mt-md-4">
      <h4 className="fw-bold text-end mb-4 border-bottom pb-2">محصولات ویژه</h4>
      <div className="row g-3">
        {products.map(product => (
          <div key={product.id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <img
                src={product.image && product.image.startsWith('http') ? product.image : API_URL + (product.image || '/images/products/green-hoodie.png')}
                alt={product.name}
                className="card-img-top"
                style={{ height: '220px', objectFit: 'contain' }}
                onError={e => e.target.src = '/images/products/green-hoodie.png'}
              />
              <div className="card-body text-end">
                <h6 className="fw-bold text-truncate">{product.name}</h6>
                <p className="text-primary fw-bold mb-2">
                  {formatPrice(product.price)} تومان
                </p>
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