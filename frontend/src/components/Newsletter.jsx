import { useState } from 'react';
import axios from 'axios';
import API_URL from '../api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const { data } = await axios.post(`${API_URL}/api/newsletter/`, { email });
      setMessage(data.message || 'درخواست شما ثبت شد.');
      setEmail('');
    } catch (error) {
      setMessage(error.response?.data?.error || 'ثبت عضویت انجام نشد؛ دوباره تلاش کنید.');
    } finally { setLoading(false); }
  };
  return (
    <section className="newsletter py-3 border-top" style={{ background: 'linear-gradient(120deg, #ede4f5, #fbf7ef)' }}>
      <div className="container"><div className="row align-items-center g-3">
        <div className="col-12 col-lg-6 text-end">
          <h6 className="fw-bold" style={{ color: '#6b459b' }}>عضویت در خبرنامه</h6>
          <p className="mb-0" style={{ color: '#342c3d' }}>از جدیدترین کالکشن‌های جین باخبر شوید.</p>
        </div>
        <div className="col-12 col-lg-6"><form className="d-flex gap-2" onSubmit={handleSubmit}>
          <input type="email" className="form-control" placeholder="ایمیل شما" aria-label="ایمیل شما" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <button className="btn px-3" type="submit" disabled={loading} style={{ borderRadius: '12px', background: '#6b459b', color: '#fff', whiteSpace: 'nowrap' }}>{loading ? '...' : 'عضویت'}</button>
        </form>{message && <p className="small mt-2 mb-0" role="status">{message}</p>}</div>
      </div></div>
    </section>
  );
};

export default Newsletter;