import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("خطا:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-3">در حال بارگذاری...</div>;

  return (
    <section className="container mt-5">
      <h4 className="fw-bold text-end mb-4 border-bottom pb-2">دسته‌بندی‌ها</h4>
      <div className="row g-3">
        {categories.map(cat => (
          <div key={cat.id} className="col-6 col-md-4 col-lg-3">
            <Link to={`/category/${cat.id}`} className="text-decoration-none">
              <div className="d-flex align-items-center justify-content-end bg-white rounded-4 shadow-sm p-3 h-100">
                <h6 className="fw-bold mb-0 text-dark">{cat.name}</h6>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}