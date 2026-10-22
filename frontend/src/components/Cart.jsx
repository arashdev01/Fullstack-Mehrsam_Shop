import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import API_URL from '../api';

export default function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  // محاسبه قیمت کل
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  const formatPrice = (price) => new Intl.NumberFormat('fa-IR').format(price);

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center p-5 bg-white rounded-4 shadow-sm">
        <i className="bi bi-cart-x fs-1 text-muted"></i>
        <h3 className="mt-3 fw-bold">سبد خرید شما خالی است</h3>
        <Link to="/" className="btn btn-primary rounded-pill mt-3">برگشت به فروشگاه</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-end">
      <div className="row">
        {/* لیست محصولات */}
        <div className="col-lg-8 mb-4">
          <div className="bg-white p-4 rounded-4 shadow-sm">
            <h4 className="fw-bold mb-4">سبد خرید شما</h4>
            {cartItems.map(item => (
              <div key={item.id} className="d-flex align-items-center border-bottom py-3">
                <img src={item.image && item.image.startsWith('http') ? item.image : item.image ? API_URL + item.image : '/images/products/green-hoodie.png'} alt={item.name} className="rounded-3" style={{ width: '80px', height: '80px', objectFit: 'contain', background: '#fbf7ef' }} onError={event => { event.currentTarget.src = '/images/products/green-hoodie.png'; }} />
                <div className="ms-3 flex-grow-1">
                  <h6 className="fw-bold mb-1">{item.name}</h6>
                  <p className="text-primary mb-0">{formatPrice(item.price)} تومان</p>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-outline-secondary rounded-circle" onClick={() => addToCart(item)}>+</button>
                  <span className="mx-3 fw-bold">{item.quantity}</span>
                  <button className="btn btn-sm btn-outline-secondary rounded-circle" onClick={() => removeFromCart(item.id)}>-</button>
                </div>
              </div>
            ))}
            <button className="btn btn-link text-danger mt-3 text-decoration-none" onClick={clearCart}>
              <i className="bi bi-trash"></i> خالی کردن سبد خرید
            </button>
          </div>
        </div>

        {/* فاکتور نهایی */}
        <div className="col-lg-4">
          <div className="bg-white p-4 rounded-4 shadow-sm">
            <h5 className="fw-bold mb-4">خلاصه سفارش</h5>
            <div className="d-flex justify-content-between mb-3">
              <span>جمع کل:</span>
              <span className="fw-bold">{formatPrice(totalPrice)} تومان</span>
            </div>
            <hr />
            <Link to="/checkout" className="btn btn-success w-100 rounded-pill py-2 fw-bold">
              تکمیل خرید
            </Link>      
            </div>
        </div>
      </div>
    </div>
  );
}