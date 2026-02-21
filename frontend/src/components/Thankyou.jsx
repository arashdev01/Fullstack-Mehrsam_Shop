import { useSearchParams, Link } from 'react-router-dom';

export default function ThankYou() {
  const [params] = useSearchParams();
  const status = params.get('status');
  const refId  = params.get('ref_id');

  const isSuccess = status === 'success' || status === 'card';
  const isFailed  = status === 'failed';

  // اطلاعات نمایشی (در پروژه واقعی از API بگیر)
  const order = {
    trackingCode: refId || '1234564',
    date: new Date().toLocaleDateString('fa-IR'),
    total: '300,000,000',
    discount: '100,000',
    shipping: '30,000',
    paymentMethod: status === 'card' ? 'کارت به کارت' : 'پرداخت اینترنتی توسط درگاه ملت',
    address: 'تهران، خیابان انقلاب، خیابان 12 فروردین، کوچه 1، پلاک 1',
    receiver: 'مصطفی کیانی',
    phone: '09121234567',
    postal: '1234567890',
    status: isSuccess ? 'در حال انجام' : 'ناموفق',
  };

  return (
    <section className="inner-page" id="contact-page">
      <div className="container-fluid" id="page-hero">
        <div className="container py-3">
          <h1>{isSuccess ? 'پرداخت موفق' : 'پرداخت ناموفق'}</h1>
          <p>{isSuccess ? 'پرداخت شما با موفقیت انجام شد.' : 'متأسفانه پرداخت شما ناموفق بود.'}</p>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
              <li className="breadcrumb-item active">{isSuccess ? 'پرداخت موفق' : 'پرداخت ناموفق'}</li>
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
              <div className="alert alert-danger rounded-4 p-4 mb-4 text-end">
                <h4 className="fw-bold text-danger">❌ پرداخت ناموفق بود.</h4>
                <p className="mb-0">مبلغی از حساب شما کسر نشده است. لطفاً دوباره تلاش کنید.</p>
                <Link to="/checkout" className="btn btn-danger rounded-pill mt-2 px-4">بازگشت به پرداخت</Link>
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