import { useState, useEffect } from 'react';

export default function PopupDiscount() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const closed = sessionStorage.getItem('popup_closed'); // sessionStorage — هر بار سشن جدید نشون بده
    if (!closed) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem('popup_closed', 'true');
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(handleClose, 2000);
  };

  if (!show) return null;

  return (
    <>
      {/* پس‌زمینه تاریک */}
      <div onClick={handleClose} style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 9998,
      }} />

      {/* پاپ‌آپ */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        width: '90%', maxWidth: '460px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        textAlign: 'center',
        direction: 'rtl',
      }}>

        {/* دکمه ✕ */}
        <button onClick={handleClose} style={{
          position: 'absolute', top: '12px', left: '12px',
          width: '32px', height: '32px',
          background: 'rgba(0,0,0,0.15)',
          border: 'none', borderRadius: '50%',
          cursor: 'pointer', fontSize: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', zIndex: 1,
          lineHeight: 1,
        }}>✕</button>

        {/* هدر */}
        <div style={{ backgroundColor: '#fcb941', padding: '30px 20px 20px' }}>
          <div style={{ fontSize: '48px' }}>🎁</div>
          <h2 style={{ color: '#fff', fontWeight: 'bold', margin: '8px 0 0', fontSize: '22px' }}>
            تخفیف ویژه خوش‌آمدگویی!
          </h2>
        </div>

        {/* محتوا */}
        <div style={{ padding: '20px 24px 24px' }}>
          {sent ? (
            <div className="alert alert-success rounded-pill">✅ کد تخفیف به ایمیل شما ارسال شد!</div>
          ) : (
            <>
              <p style={{ color: '#555', marginBottom: '16px' }}>
                با عضویت در خبرنامه روبیک مارکت<br />
                <strong style={{ fontSize: '18px', color: '#fcb941' }}>۱۰٪ تخفیف</strong> برای اولین خریدت بگیر!
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  className="form-control text-end mb-3"
                  style={{ borderRadius: '10px' }}
                  placeholder="ایمیل خود را وارد کنید..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-warning w-100 fw-bold rounded-pill py-2">
                  دریافت تخفیف
                </button>
              </form>
              <button onClick={handleClose}
                className="btn btn-link text-muted mt-2 small text-decoration-none w-100">
                نه ممنون، تخفیف نمی‌خوام
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
