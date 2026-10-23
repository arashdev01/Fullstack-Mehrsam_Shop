import { useSearchParams, Link } from 'react-router-dom';

export default function ThankYou() {
  const [params] = useSearchParams();
  const status = params.get('status');
  const refId  = params.get('ref_id');

  const isPending = status === 'pending';
  const isSuccess = false; // A query-string status is not proof of payment; verification is disabled.
  const isFailed = !isPending && !isSuccess;

  // اطلاعات نمایشی (در پروژه واقعی از API بگیر)
  const order = {
    trackingCode: refId || params.get('order_id') || '—',
    date: new Date().toLocaleDateString('fa-IR'),
    total: 'پس از تأیید سفارش اعلام می‌شود',
    discount: '—',
    shipping: '—',
    paymentMethod: 'درگاه پرداخت آنلاین هنوز فعال نیست',
    address: 'نشانی در جزئیات سفارش ثبت شده است.',
    receiver: '—',
    phone: '—',
    postal: '—',
    status: isPending ? 'ثبت‌شده، در انتظار پرداخت' : 'نیازمند بررسی',
  };

  return (
    <section className="inner-page" id="contact-page">
      <div className="container-fluid" id="page-hero">
        <div className="container py-3">
          <h1>{isPending ? 'سفارش ثبت شد' : isSuccess ? 'پرداخت تأیید شد' : 'وضعیت پرداخت قابل تأیید نیست'}</h1>
          <p>{isPending ? 'سفارش ثبت شده است، اما پرداخت آنلاین در حال حاضر فعال نیست.' : isSuccess ? 'پرداخت از سمت سرور تأیید شده است.' : 'از روی آدرس صفحه نمی‌توان موفقیت پرداخت را تأیید کرد.'}</p>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
              <li className="breadcrumb-item active">{isPending ? 'در انتظار پرداخت' : isSuccess ? 'پرداخت تأیید شد' : 'وضعیت پرداخت'}</li>
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
            ) : isPending ? (
              <div className="alert alert-warning rounded-4 p-4 mb-4 text-end">
                <h4 className="fw-bold">سفارش ثبت شد؛ پرداخت هنوز انجام نشده است.</h4>
                <p className="mb-0">درگاه آنلاین هنوز پیکربندی نشده؛ این صفحه رسید پرداخت محسوب نمی‌شود.</p>
                <Link to="/" className="btn btn-primary rounded-pill mt-2 px-4">بازگشت به فروشگاه</Link>
              </div>
            ) : (
              <div className="alert alert-danger rounded-4 p-4 mb-4 text-end">
                <h4 className="fw-bold text-danger">وضعیت پرداخت قابل تأیید نیست.</h4>
                <p className="mb-0">تا زمانی که سرور پرداخت را تأیید نکرده، این صفحه موفقیت پرداخت را نشان نمی‌دهد.</p>
                <Link to="/checkout" className="btn btn-danger rounded-pill mt-2 px-4">بازگشت به سفارش</Link>
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