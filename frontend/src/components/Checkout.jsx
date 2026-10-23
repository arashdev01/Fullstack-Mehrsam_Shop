
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../CartContext';
import API_URL from '../api';

const deliveryDates = Array.from({ length: 6 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index + 2);
  return { id: `date${index + 1}`, day: date.toLocaleDateString('fa-IR', { weekday: 'long' }), date: date.toLocaleDateString('fa-IR', { day: 'numeric', month: 'long' }) };
});

export default function Checkout() {
  const { cartItems: cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState('date1');
  const [acceptRules, setAcceptRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [address, setAddress] = useState({
    province: '', city: '', address: '',
    postal: '', receiver: '', phone: ''
  });
  const updateAddress = (event) => setAddress((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const addressFields = [['province', 'استان'], ['city', 'شهر'], ['address', 'نشانی کامل'],
    ['postal', 'کدپستی'], ['receiver', 'نام تحویل‌گیرنده'], ['phone', 'شماره موبایل']];


  const totalPrice = cart.reduce(function (sum, item) {
    return sum + Number(item.price) * item.quantity;
  }, 0);

  const discount = 0;
  const finalPrice = totalPrice - discount;

  const handleSubmit = async () => {
    if (!acceptRules) {
      setError('لطفاً قوانین و مقررات را قبول کنید');
      return;
    }

    if (cart.length === 0) {
      setError('سبد خرید شما خالی است');
      return;
    }
    if (!address.province.trim() || !address.city.trim() || !address.address.trim() || !address.receiver.trim() || !/^09\d{9}$/.test(address.phone.trim())) {
      setError('استان، شهر، نشانی، نام تحویل‌گیرنده و شماره موبایل معتبر را وارد کنید.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        phone: address.phone,
        address:
          address.province +
          '، ' +
          address.city +
          '، ' +
          address.address +
          '، کدپستی: ' +
          address.postal +
          '، تحویل‌گیرنده: ' +
          address.receiver,
        total_price: finalPrice,
        items: cart.map(function (item) {
          return {
            product: item.id,
            name: item.name,
            quantity: item.quantity,
            price: Number(item.price),
            image: item.image,
          };
        }),
      };

      const response = await axios.post(`${API_URL}/api/orders/`, orderData);

      console.log('Order created:', response.data);
      console.log('Selected delivery date:', selectedDate);

      clearCart();

      const orderId = response.data.order_id || '';

      navigate('/thankyou?status=pending&order_id=' + orderId);
    } catch (err) {
      console.error('Order creation error:', err);

      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('خطا در ثبت سفارش. لطفاً دوباره تلاش کنید.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="inner-page" id="checkout-page">
      <div className="container-fluid" id="page-hero">
        <div className="container py-3">
          <h1>پیش فاکتور</h1>

          <p>
            با تکمیل ثبت سفارش، خرید خود را نهایی کنید.
          </p>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">صفحه نخست</Link>
              </li>

              <li
                className="breadcrumb-item active"
                aria-current="page"
              >
                پیش فاکتور
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content">
              <div className="row">

                <div className="col-12 col-lg-9">

                  <section id="choose-address">
                    <div className="container">
                      <div className="row">
                        <div className="col-12 py-3">

                          <div className="pb-1 title">
                            آدرس تحویل سفارش
                          </div>

                          <div className="row">

                            <div
                              className="col-12 col-md-9 pl-0"
                              id="address-detail"
                            >
                              <div className="p-3 ml-3 mb-2 mb-md-0 address-to-send">

                                <div className="address-title mb-2">اطلاعات تحویل سفارش را وارد کنید</div>
                                <div className="row g-2">
                                  {addressFields.map(([name, label]) => (
                                    <div key={name} className={name === 'address' ? 'col-12' : 'col-6 col-md-4'}>
                                      <input className="form-control" name={name} placeholder={label} aria-label={label} value={address[name]} onChange={updateAddress} required={name !== 'postal'} type={name === 'phone' ? 'tel' : 'text'} />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-md-3">
                              <div className="row">

                                <div className="col-6 col-md-12 pl-2 px-md-3 mb-1">
                                  <Link
                                    to="/profile/addresses"
                                    className="btn btn-light w-100"
                                  >
                                    تغییر آدرس
                                  </Link>
                                </div>

                                <div className="col-6 col-md-12 pr-2 px-md-3">
                                  <Link
                                    to="/profile/addresses"
                                    className="btn btn-outline-dark w-100"
                                  >
                                    افزودن آدرس جدید
                                  </Link>
                                </div>

                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="mt-3" id="orders">
                    <div className="container mt-2">
                      <div className="row">
                        <div className="col-12">

                          <div className="pb-1 title">
                            سفارشات شما
                          </div>

                          <div className="row">

                            {cart.length === 0 ? (
                              <div className="col-12 text-center text-muted py-3">
                                سبد خرید خالی است.{' '}
                                <Link to="/">
                                  بازگشت به فروشگاه
                                </Link>
                              </div>
                            ) : (
                              cart.map(function (item) {
                                return (
                                  <span
                                    key={item.id}
                                    className="col-6 col-sm-4 col-lg-3 px-0"
                                  >
                                    <div className="encode4326654321vfb">

                                      <div
                                        className="image"
                                        style={{
                                          backgroundImage:
                                            'url(' + item.image + ')',
                                        }}
                                      />

                                      <div className="text-center px-1 px-sm-3">
                                        <h2>{item.name}</h2>

                                        <div className="number">
                                          تعداد: {item.quantity} عدد
                                        </div>
                                      </div>

                                    </div>
                                  </span>
                                );
                              })
                            )}

                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section
                    className="mt-3"
                    id="select-receive-date"
                  >
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12">

                          <div className="container px-0">
                            <div className="row py-2 px-3">
                              <div className="col-12">

                                <div className="pb-1 title">
                                  انتخاب تاریخ تحویل
                                </div>

                                <div className="row">

                                  {deliveryDates.map(function (date) {
                                    return (
                                      <div
                                        key={date.id}
                                        className="col-6 col-sm-4 col-lg-2 pt-3 pt-md-0 pl-2"
                                      >
                                        <div className="form-check">

                                          <input
                                            type="radio"
                                            className="form-check-input valid-order-date"
                                            id={date.id}
                                            name="delivery_date"
                                            checked={
                                              selectedDate === date.id
                                            }
                                            onChange={function () {
                                              setSelectedDate(date.id);
                                            }}
                                          />

                                          <label
                                            className="receive-date"
                                            htmlFor={date.id}
                                          >
                                            {date.day}
                                            <br />
                                            <span className="date">
                                              {date.date}
                                            </span>
                                          </label>

                                        </div>
                                      </div>
                                    );
                                  })}

                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </section>

                </div>

                <div className="col-12 col-lg-3 mt-2 mt-lg-0">
                  <div id="factor">

                    <div className="container">

                      <div className="row py-2">
                        <div className="col-6">
                          جمع کل فاکتور:
                        </div>

                        <div className="col-6">
                          {totalPrice.toLocaleString('fa-IR')} تومان
                        </div>
                      </div>

                      <div className="row py-2 bg-light">
                        <div className="col-6">
                          جمع تخفیف:
                        </div>

                        <div className="col-6">
                          {discount.toLocaleString('fa-IR')} تومان
                        </div>
                      </div>

                      <div className="row py-2">
                        <div className="col-6">
                          هزینه ارسال:
                        </div>

                        <div className="col-6 small">
                          درب منزل با مشتری
                        </div>
                      </div>

                      <div className="row py-2" id="total">
                        <div className="col-6 fw-bold">
                          مبلغ قابل پرداخت:
                        </div>

                        <div className="col-6 fw-bold text-success">
                          {finalPrice.toLocaleString('fa-IR')} تومان
                        </div>
                      </div>

                    </div>

                    <hr />

                    <div className="container">

                      <div className="row py-2">
                        <div className="col-12 fw-bold">
                          روش ثبت سفارش
                        </div>
                      </div>

                      <div className="row pb-2">

                        <div className="col-12 pb-2">
                          <div className="alert alert-info small mb-2">
                            در نسخه فعلی، سفارش ثبت می‌شود و پرداخت آنلاین
                            زرین‌پال فعلاً فعال نیست.
                          </div>
                        </div>

                        <div
                          className="col-12 pb-2"
                          id="rules"
                        >
                          <div className="form-check">

                            <label className="form-check-label">

                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={acceptRules}
                                onChange={function (e) {
                                  setAcceptRules(e.target.checked);
                                }}
                              />

                              <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                              >
                                قوانین و مقررات
                              </a>{' '}
                              را خواندم و قبول دارم.

                            </label>

                          </div>
                        </div>

                        {error && (
                          <div className="col-12 mb-2">
                            <div className="alert alert-danger small py-2">
                              {error}
                            </div>
                          </div>
                        )}

                        <div className="col-12">
                          <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="btn btn-success w-100 rounded-pill"
                          >
                            {loading
                              ? 'در حال ثبت سفارش...'
                              : 'ثبت و تکمیل سفارش'}
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

