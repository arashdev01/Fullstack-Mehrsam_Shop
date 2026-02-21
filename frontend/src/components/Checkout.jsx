import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from "../CartContext";
const deliveryDates = [
  { id: 'date1', day: 'دوشنبه',    date: '20 تیر 1400' },
  { id: 'date2', day: 'سه شنبه',   date: '21 تیر 1400' },
  { id: 'date3', day: 'چهارشنبه',  date: '22 تیر 1400' },
  { id: 'date4', day: 'پنج شنبه',  date: '23 تیر 1400' },
  { id: 'date5', day: 'جمعه',      date: '24 تیر 1400' },
  { id: 'date6', day: 'شنبه',      date: '25 تیر 1400' },
];

export default function Checkout() {
  const { cartItems: cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate]       = useState('date1');
  const [paymentMethod, setPaymentMethod]     = useState('online');
  const [acceptRules, setAcceptRules]         = useState(false);
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState('');

  // آدرس (بعداً از API پروفایل بگیر)
  const address = {
    province: 'فارس',
    city: 'شیراز',
    address: 'بلوار آزادگان، کارخانه نوآوری شیراز',
    postal: '1234567890',
    receiver: 'مصطفی',
    phone: '09351234567',
  };

  const totalPrice    = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount      = 0;
  const finalPrice    = totalPrice - discount;

  const handleSubmit = async () => {
    if (!acceptRules) {
      setError('لطفاً قوانین و مقررات را قبول کنید');
      return;
    }
    if (cart.length === 0) {
      setError('سبد خرید شما خالی است');
      return;
    }

    setLoading(true);
    setError('');

    const token = localStorage.getItem('access_token');

    try {
      if (paymentMethod === 'online') {
        // ثبت سفارش در Django
        const orderRes = await axios.post('http://127.0.0.1:8000/api/checkout/', {
          items: cart.map(i => ({ product: i.id, quantity: i.quantity })),
          total_price: finalPrice,
          delivery_date: selectedDate,
        }, { headers: { Authorization: `Bearer ${token}` } });

        const orderId = orderRes.data.id;

        // ارسال به زرین‌پال
        const payRes = await axios.post('http://127.0.0.1:8000/api/payment/request/', {
          order_id: orderId,
          total_price: finalPrice,
        }, { headers: { Authorization: `Bearer ${token}` } });

        if (payRes.data.pay_url) {
          clearCart();
          window.location.href = payRes.data.pay_url; // ریدایرکت به زرین‌پال
        }
      } else {
        // کارت به کارت
        await axios.post('http://127.0.0.1:8000/api/checkout/', {
          items: cart.map(i => ({ product: i.id, quantity: i.quantity })),
          total_price: finalPrice,
          payment_method: 'card',
        }, { headers: { Authorization: `Bearer ${token}` } });

        clearCart();
        navigate('/thankyou?status=card');
      }
    } catch (err) {
      setError('خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="inner-page" id="checkout-page">
      <div className="container-fluid" id="page-hero">
        <div className="container py-3">
          <h1>پیش فاکتور</h1>
          <p>با تکمیل پرداخت فاکتور، خرید خود را تکمیل کنید.</p>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
              <li className="breadcrumb-item active" aria-current="page">پیش فاکتور</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <div className="row">

                {/* ─── ستون اصلی ─── */}
                <div className="col-12 col-lg-9">

                  {/* آدرس تحویل */}
                  <section id="choose-address">
                    <div className="container">
                      <div className="row">
                        <div className="col-12 py-3">
                          <div className="pb-1 title">آدرس تحویل سفارش</div>
                          <div className="row">
                            <div className="col-12 col-md-9 pl-0" id="address-detail">
                              <div className="p-3 ml-3 mb-2 mb-md-0 address-to-send">
                                <div className="address-title">
                                  {address.province}، {address.city}، {address.address}
                                </div>
                                <div className="row mt-2">
                                  <div className="col-12 col-md-4">کدپستی: {address.postal}</div>
                                  <div className="col-12 col-md-8">تحویل گیرنده: {address.receiver} | {address.phone}</div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-3">
                              <div className="row">
                                <div className="col-6 col-md-12 pl-2 px-md-3 mb-1">
                                  <Link to="/profile/addresses" className="btn btn-light w-100">تغییر آدرس</Link>
                                </div>
                                <div className="col-6 col-md-12 pr-2 px-md-3">
                                  <Link to="/profile/addresses" className="btn btn-outline-dark w-100">افزودن آدرس جدید</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* سفارشات */}
                  <section className="mt-3" id="orders">
                    <div className="container mt-2">
                      <div className="row">
                        <div className="col-12">
                          <div className="pb-1 title">سفارشات شما</div>
                          <div className="row">
                            {cart.length === 0 ? (
                              <div className="col-12 text-center text-muted py-3">
                                سبد خرید خالی است. <Link to="/">بازگشت به فروشگاه</Link>
                              </div>
                            ) : cart.map(item => (
                              <span key={item.id} className="col-6 col-sm-4 col-lg-3 px-0">
                                <div className="encode4326654321vfb">
                                  <div className="image" style={{ backgroundImage: `url(${item.image})` }}></div>
                                  <div className="text-center px-1 px-sm-3">
                                    <h2>{item.name}</h2>
                                    <div className="number">تعداد: {item.quantity} عدد</div>
                                  </div>
                                </div>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* انتخاب تاریخ تحویل */}
                  <section className="mt-3" id="select-receive-date">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12">
                          <div className="container px-0">
                            <div className="row py-2 px-3">
                              <div className="col-12">
                                <div className="pb-1 title">انتخاب تاریخ تحویل</div>
                                <div className="row">
                                  {deliveryDates.map(d => (
                                    <div key={d.id} className="col-6 col-sm-4 col-lg-2 pt-3 pt-md-0 pl-2">
                                      <div className="form-check">
                                        <input
                                          type="radio"
                                          className="form-check-input valid-order-date"
                                          id={d.id}
                                          name="delivery_date"
                                          checked={selectedDate === d.id}
                                          onChange={() => setSelectedDate(d.id)}
                                        />
                                        <label className="receive-date" htmlFor={d.id}>
                                          {d.day}<br /><span className="date">{d.date}</span>
                                        </label>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                </div>

                {/* ─── ستون فاکتور ─── */}
                <div className="col-12 col-lg-3 mt-2 mt-lg-0">
                  <div id="factor">
                    <div className="container">
                      <div className="row py-2">
                        <div className="col-6">جمع کل فاکتور:</div>
                        <div className="col-6">{totalPrice.toLocaleString('fa-IR')} تومان</div>
                      </div>
                      <div className="row py-2 bg-light">
                        <div className="col-6">جمع تخفیف:</div>
                        <div className="col-6">{discount.toLocaleString('fa-IR')} تومان</div>
                      </div>
                      <div className="row py-2">
                        <div className="col-6">هزینه ارسال:</div>
                        <div className="col-6 small">درب منزل با مشتری</div>
                      </div>
                      <div className="row py-2" id="total">
                        <div className="col-6 fw-bold">مبلغ قابل پرداخت:</div>
                        <div className="col-6 fw-bold text-success">{finalPrice.toLocaleString('fa-IR')} تومان</div>
                      </div>
                    </div>
                    <hr />
                    <div className="container">
                      <div className="row py-2">
                        <div className="col-12 fw-bold">انتخاب نحوه پرداخت</div>
                      </div>
                      <div className="row pb-2">
                        <div className="col-12 pb-2">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="payment_type"
                                checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
                              پرداخت آنلاین
                            </label>
                          </div>
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="radio" className="form-check-input" name="payment_type"
                                checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                              ثبت فیش پرداخت/کارت به کارت
                            </label>
                          </div>
                        </div>
                        <div className="col-12 pb-2" id="rules">
                          <div className="form-check">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input"
                                checked={acceptRules} onChange={e => setAcceptRules(e.target.checked)} />
                              <a href="#" target="_blank">قوانین و مقررات</a> را خواندم و قبول دارم.
                            </label>
                          </div>
                        </div>
                        {error && <div className="col-12 mb-2"><div className="alert alert-danger small py-2">{error}</div></div>}
                        <div className="col-12">
                          <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="btn btn-success w-100 rounded-pill"
                          >
                            {loading ? 'در حال پردازش...' : 'پرداخت و تکمیل خرید'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}