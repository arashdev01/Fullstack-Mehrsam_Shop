import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import API_URL from '../api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [submittingComment, setSubmittingComment] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);

    axios.get(`${API_URL}/api/products/${id}/`)
      .then(res => {
        setProduct(res.data);
        setMainImage(res.data.image);
        setLoading(false);
      })
      .catch(err => {
        console.error('خطا:', err);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">در حال بارگذاری...</div>;
  }

  if (!product) {
    return <div className="text-center mt-5">محصول پیدا نشد!</div>;
  }

  const formatPrice = price => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const handleCommentSubmit = e => {
    e.preventDefault();

    if (submittingComment) return;

    setSubmittingComment(true);

    axios.post(`${API_URL}/api/comments/`, {
      product: id,
      name: name,
      text: text
    })
      .then(res => {
        alert('نظر شما با موفقیت ثبت شد!');

        setProduct(prevProduct => ({
          ...prevProduct,
          comments: [
            ...(prevProduct.comments || []),
            res.data
          ]
        }));

        setName('');
        setText('');
      })
      .catch(err => {
        console.error('خطا در ثبت نظر:', err);
        alert('خطا در ثبت نظر!');
      })
      .finally(() => {
        setSubmittingComment(false);
      });
  };

  return (
    <div className="container mt-5 text-end">
      <div className="row bg-white p-4 rounded-4 shadow-sm">
        {/* بخش عکس محصول و گالری */}
        <div className="col-md-6 mb-4">
          {/* عکس بزرگ */}
          <img
            src={mainImage ? (mainImage.startsWith('http') ? mainImage : API_URL + mainImage) : '/images/products/green-hoodie.png'}
            alt={product.name}
            className="img-fluid rounded-4 shadow-sm mb-3"
            style={{ width: '100%', height: '450px', objectFit: 'contain', background: '#fbf7ef' }}
            onError={e => {
              e.currentTarget.src = '/images/user-no-image.jpg';
            }}
          />

          {/* بخش گالری عکس‌های کوچک */}
          <div className="d-flex gap-2 overflow-auto">
            {/* عکس اصلی محصول به عنوان اولین مورد گالری */}
            <img
              src={product.image && product.image.startsWith('http') ? product.image : API_URL + (product.image || '/images/products/green-hoodie.png')}
              alt={product.name}
              className={`rounded-3 border ${
                mainImage === product.image ? 'border-primary border-2' : ''
              }`}
              style={{
                width: '80px',
                height: '80px',
                objectFit: 'cover',
                cursor: 'pointer'
              }}
              onClick={() => setMainImage(product.image)}
              onError={e => {
                e.currentTarget.src = '/images/products/green-hoodie.png';
              }}
            />

            {/* بقیه عکس‌های گالری که از جنگو می‌آیند */}
            {product.images && product.images.map(img => (
              <img
                key={img.id}
                src={img.image && img.image.startsWith('http') ? img.image : API_URL + (img.image || '/images/products/green-hoodie.png')}
                alt={product.name}
                className={`rounded-3 border ${
                  mainImage === img.image ? 'border-primary border-2' : ''
                }`}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
                onClick={() => setMainImage(img.image)}
                onError={e => {
                  e.currentTarget.src = '/images/user-no-image.jpg';
                }}
              />
            ))}
          </div>
        </div>

        {/* بخش اطلاعات محصول */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-end">
              <li className="breadcrumb-item active">
                {product.category ? product.category.name : 'بدون دسته'}
              </li>
              <li className="breadcrumb-item">دسته‌بندی</li>
            </ol>
          </nav>

          <hr />

          <h3 className="text-primary fw-bold mb-4">
            {formatPrice(product.price)} تومان
          </h3>

          <p
            className="text-muted mb-4"
            style={{ lineHeight: '1.8' }}
          >
            {product.description}
          </p>

          <div className="mb-4">
            {product.stock > 0 ? (
              <span className="badge bg-success-subtle text-success p-2 px-3 rounded-pill">
                تعداد موجود در انبار: {product.stock}
              </span>
            ) : (
              <span className="badge bg-danger-subtle text-danger p-2 px-3 rounded-pill">
                متأسفانه این محصول فعلاً تمام شده است
              </span>
            )}
          </div>

          <button
            className={`btn btn-lg rounded-pill w-100 ${
              product.stock > 0 ? 'btn-primary' : 'btn-secondary disabled'
            }`}
            onClick={() => addToCart(product)}
          >
            {product.stock > 0 ? 'افزودن به سبد خرید' : 'ناموجود'}
          </button>

          <Link
            to="/"
            className="btn btn-link w-100 mt-3 text-decoration-none text-muted"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>

      {/* فرم ارسال نظر */}
      <div className="card border-0 shadow-sm rounded-4 mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">ثبت نظر جدید</h5>

          <form onSubmit={handleCommentSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="نام شما"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="متن نظر..."
                value={text}
                onChange={e => setText(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary px-4 rounded-pill"
              disabled={submittingComment}
            >
              {submittingComment ? 'در حال ارسال...' : 'ارسال نظر'}
            </button>
          </form>
        </div>
      </div>

      {/* بخش نمایش نظرات */}
      <div className="mt-5 bg-light p-4 rounded-4">
        <h4 className="fw-bold mb-4">نظرات کاربران</h4>

        {product.comments && product.comments.length > 0 ? (
          product.comments.map(comment => (
            <div
              key={comment.id}
              className="bg-white p-3 rounded-3 mb-3 shadow-sm"
            >
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold text-primary">
                  {comment.name}
                </span>

                <small className="text-muted">
                  {new Date(comment.created_at).toLocaleDateString('fa-IR')}
                </small>
              </div>

              <p className="mb-0 text-secondary">
                {comment.text}
              </p>
            </div>
          ))
        ) : (
          <p className="text-muted">
            هنوز نظری برای این محصول ثبت نشده است.
          </p>
        )}
      </div>
    </div>
  );
}