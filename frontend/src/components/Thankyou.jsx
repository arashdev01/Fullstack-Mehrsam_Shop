import { useSearchParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../CartContext';
export default function ThankYou() {
  const [params] = useSearchParams();
  const status = params.get('status');
  const refId  = params.get('ref_id');
  const { clearCart } = useCart();
  const isSuccess = status === 'success';
  const isPending = status === 'pending';
  useEffect(() => { if (isSuccess) clearCart(); }, [isSuccess, clearCart]);
  // اطلاعات نمایشی (در پروژه واقعی از API بگیر)
  const order = {
    trackingCode: refId || '—',
    date: new Date().toLocaleDateString('fa-IR'),
    total: 'طبق سفارش ثبت‌شده',
    discount: '—',
    shipping: 'طبق سفارش',
    paymentMethod: 'پرداخت اینترنتی زرین‌پال',
    address: 'اطلاعات نشانی در جزئیات سفارش قابل مشاهده است.',
    receiver: '—',
    phone: '—',
    postal: '—',
    status: isSuccess ? 'پرداخت شده' : isPending ? 'در انتظار پرداخت' : 'ناموفق',
  };
  return (
    <section className="inner-page" id="contact-page">
      <div className="container-fluid" id="page-hero">
        <div className="container py-3">
          <h1>{isSuccess ? 'پرداخت موفق' : isPending ? 'سفارش ثبت شد' : 'پرداخت ناموفق'}</h1>
          <p>{isSuccess ? 'پرداخت شما با موفقیت انجام شد.' : isPending ? 'سفارش ثبت شده است، اما پرداخت هنوز تأیید نشده است.' : 'متأسفانه پرداخت شما ناموفق بود.'}</p>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
              <li className="breadcrumb-item active">{isSuccess ? 'پرداخت موفق' : isPending ? 'در انتظار پرداخت' : 'پرداخت ناموفق'}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">

            {/* پیام اصلی */}
            {isSuccess ? (
              <div className="alert alert-success rounded-4 p-4 mb-4 text-end">
                <h4 className="fw-bold text-success">✅ پرداخت شما با موفقیت انجام شد.</h4>
                <p className="mb-0">سفارش شما در حال انجام می باشد. تغییر وضعیت سفارش از طریق پیامک خدمت شما اطلاع داده خواهد شد.</p>
              </div>
            ) : (
              <div className={`alert ${isPending ? 'alert-warning' : 'alert-danger'} rounded-4 p-4 mb-4 text-end`}>
                <h4 className={`fw-bold ${isPending ? 'text-dark' : 'text-danger'}`}>{isPending ? 'سفارش دریافت شد؛ پرداخت تأیید نشده است.' : '❌ پرداخت ناموفق بود.'}</h4>
                <p className="mb-0">{isPending ? 'درگاه پرداخت آنلاین هنوز به‌طور کامل پیکربندی نشده است؛ این سفارش پرداخت‌شده تلقی نمی‌شود.' : 'مبلغی از حساب شما کسر نشده است. لطفاً دوباره تلاش کنید.'}</p>
                <Link to={isPending ? '/' : '/checkout'} className="btn btn-primary rounded-pill mt-2 px-4">{isPending ? 'بازگشت به فروشگاه' : 'بازگشت به پرداخت'}</Link>
              </div>
            )}

            {/* جزئیات سفارش */}
            {isSuccess && (
              <div className="bg-white rounded-4 shadow-sm p-4 text-end">
                <h5 className="fw-bold text-primary mb-3">جزئیات سفارش</h5>
                <hr />

                <div className="row py-2 border-bottom">
                  <div className="col-12 col-md-4 fw-bold">شماره پیگیری:</div>
                  <div className="col-12 col-md-4">{order.trackingCode}</div>
                  <div className="col-12 col-md-4">
                    <span className="badge bg-warning text-dark">وضعیت سفارش: {order.status}</span>
                  </div>
                </div>

                <div className="row py-2 border-bottom">
                  <div className="col-12 col-md-4 fw-bold">تاریخ ثبت:</div>
                  <div className="col-12 col-md-4">{order.date}</div>
                </div>

                <div className="row py-2 border-bottom">
                  <div className="col-12 col-md-4 fw-bold">مبلغ پرداختی:</div>
                  <div className="col-12 col-md-4">{order.total} تومان</div>
                  <div className="col-12 col-md-4 text-success">جمع تخفیف: {order.discount} تومان</div>
                </div>

                <div className="row py-2 border-bottom">
                  <div className="col-12 col-md-4 fw-bold">روش پرداخت:</div>
                  <div className="col-12 col-md-8">{order.paymentMethod}</div>
                </div>

                <div className="row py-2 border-bottom">
                  <div className="col-12 col-md-4 fw-bold">هزینه ارسال:</div>
                  <div className="col-12 col-md-8">{order.shipping} تومان</div>
                </div>

                <div className="row py-3">
                  <div className="col-12 col-md-4 fw-bold">ارسال به:</div>
                  <div className="col-12 col-md-8">
                    <div className="fw-bold">{order.address}</div>
                    <div className="text-muted small mt-1">تحویل گیرنده: {order.receiver} ({order.phone})</div>
                    <div className="text-muted small">کدپستی: {order.postal}</div>
                  </div>
                </div>

                <hr />
                <div className="d-flex gap-3 justify-content-start">
                  <Link to="/profile/orders" className="btn btn-primary rounded-pill px-4">مشاهده سفارشات</Link>
                  <Link to="/" className="btn btn-outline-secondary rounded-pill px-4">بازگشت به فروشگاه</Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}