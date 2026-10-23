import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';

// ─── ساید بار مشترک ───────────────────────────────────────
function ProfileSidebar({ active }) {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('access_token'); localStorage.removeItem('refresh_token'); localStorage.removeItem('username');
    navigate('/');
    window.location.reload();
  };

  const menuItems = [
    { key: 'info',      to: '/profile',           icon: 'fa-user',          label: 'اطلاعات حساب' },
    { key: 'orders',    to: '/profile/orders',     icon: 'fa-shopping-bag',  label: 'سفارش های من' },
    { key: 'favorites', to: '/profile/favorites',  icon: 'fa-heart',         label: 'علاقه مندی ها' },
    { key: 'addresses', to: '/profile/addresses',  icon: 'fa-map-marker-alt',label: 'آدرس های من' },
  ];

  return (
    <div className="accordion" id="side-panel">
      <div className="accordion-item menu-container border-0 shadow-sm">
        <h2 className="accordion-header">
          <button className="accordion-button bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true">
            <span className="row w-100">
              <span className="col-3">
                <img src="/images/user-no-image.jpg" className="rounded-circle w-100"
                  onError={e => e.target.src='https://via.placeholder.com/50?text=U'} />
              </span>
              <span className="col-7 align-self-center">
                <div className="fw-bold">{username || 'کاربر'}</div>
              </span>
            </span>
          </button>
        </h2>
        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
          <div className="accordion-body p-0">
            <ul className="list-unstyled mb-0">
              {menuItems.map(item => (
                <li key={item.key}>
                  <Link to={item.to}
                    className={`d-flex align-items-center gap-2 px-3 py-2 text-decoration-none border-bottom ${active === item.key ? 'text-primary fw-bold bg-light' : 'text-dark'}`}>
                    <div className="icon d-inline-block">
                      <i className={`fa ${item.icon}`}></i>
                    </div>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li><hr className="my-0" /></li>
              <li>
                <button onClick={handleLogout}
                  className="d-flex align-items-center gap-2 px-3 py-2 w-100 border-0 bg-transparent text-danger">
                  <i className="fa fa-sign-out-alt"></i> خروج از حساب
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── صفحه اطلاعات شخصی ────────────────────────────────────
export function PersonalInfo() {
  const username = localStorage.getItem('username');

  const fields = [
    { label: 'نام کاربری', value: username || '—' },
    { label: 'کدملی', value: '—' },
    { label: 'شماره تلفن همراه', value: '—' },
    { label: 'تلفن ثابت', value: '—' },
    { label: 'پست الکترونیک', value: '—' },
    { label: 'تاریخ تولد', value: '—' },
    { label: 'شماره کارت جهت مرجوع وجه', value: '—' },
    { label: 'رمز عبور', value: '******' },
  ];

  return (
    <div className="container mt-4 text-end">
      <div className="container-fluid" id="page-hero">
        <div className="container py-3">
          <h1>ناحیه کاربری</h1>
          <p>به ناحیه کاربری مهرسام جینز خوش آمدید.</p>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
              <li className="breadcrumb-item">ناحیه کاربری</li>
              <li className="breadcrumb-item active">ویرایش پروفایل</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-lg-3 mb-3">
            <ProfileSidebar active="info" />
          </div>
          <div className="col-12 col-lg-9">
            <div className="custom-container bg-light p-4 rounded-3" id="profile-fields">
              <h1 className="fs-4 fw-bold">اطلاعات شخصی</h1>
              <hr />
              <div className="row">
                {fields.map((field, i) => (
                  <div key={i} className="col-12 col-sm-6 py-2">
                    <div className="row profile-field border-bottom pb-2">
                      <div className="col-10">
                        <div className="text-muted small">{field.label}</div>
                        <div className="fw-bold mt-1">{field.value}</div>
                      </div>
                      <div className="col-2 text-start">
                        <a href="#"><i className="fa fa-edit text-primary"></i></a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── صفحه سفارشات ─────────────────────────────────────────
export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { key: 'pending',   label: 'در انتظار پرداخت' },
    { key: 'paid',      label: 'پرداخت شده' },
    { key: 'shipped',   label: 'ارسال شده' },
    { key: 'completed', label: 'تکمیل شده' },
    { key: 'cancelled', label: 'لغو شده' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios.get(`${API_URL}/api/orders/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => { setOrders(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4 text-end">
      <div className="container-fluid" id="page-hero">
        <div className="container py-3">
          <h1>ناحیه کاربری</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
              <li className="breadcrumb-item">ناحیه کاربری</li>
              <li className="breadcrumb-item active">سفارشات</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-lg-3 mb-3">
            <ProfileSidebar active="orders" />
          </div>
          <div className="col-12 col-lg-9">
            {/* فیلتر وضعیت سفارش */}
            <div className="custom-container p-3 rounded-3 bg-white shadow-sm mb-3" id="orders-status">
              <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0">
                {filters.map(f => (
                  <li key={f.key}>
                    <button
                      onClick={() => setActiveFilter(f.key)}
                      className={`btn btn-sm rounded-pill ${activeFilter === f.key ? 'btn-primary' : 'btn-outline-secondary'}`}>
                      {f.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* لیست سفارشات */}
            {loading ? (
              <div className="text-center py-5">در حال بارگذاری...</div>
            ) : orders.length === 0 ? (
              <div className="custom-container p-5 text-center rounded-3 bg-white shadow-sm">
                <i className="fa fa-shopping-bag fa-3x text-muted mb-3"></i>
                <p className="text-muted">هنوز سفارشی ثبت نکرده‌اید</p>
                <Link to="/" className="btn btn-primary rounded-pill px-4">رفتن به فروشگاه</Link>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="custom-container mt-2 order p-3 rounded-3 bg-white shadow-sm">
                  <div className="row pt-2 px-3">
                    <div className="col-12 col-sm-6">
                      <h5 className="fw-bold">سفارش شماره #{order.id}</h5>
                    </div>
                    <div className="col-12 col-sm-6 text-sm-start">
                      <span className="text-muted">{order.created_at}</span> -
                      <span className={'badge me-1 ' + (order.status === 'paid' ? 'bg-success' : 'bg-warning text-dark')}>{order.status === 'paid' ? 'پرداخت شده' : 'در انتظار پرداخت'}</span>
                    </div>
                  </div>
                  <hr />
                  <div className="px-3">
                    <div className="fw-bold text-primary mb-2">
                      مبلغ کل: {Number(order.total_price).toLocaleString('fa-IR')} تومان
                    </div>
                    <div className="row">
                      {order.items && order.items.map((item, i) => (
                        <div key={i} className="col-6 col-sm-4 col-lg-3 px-1 mb-2">
                          <Link to={`/product/${item.product}`} target="_blank">
                            <div className="border rounded-3 overflow-hidden text-center p-2">
                              <img src={item.image ? (item.image.startsWith('http') ? item.image : API_URL + item.image) : '/images/products/green-hoodie.png'} alt={item.name}
                                style={{ width: '100%', height: '80px', objectFit: 'cover' }}
                                onError={e => e.target.src='/images/products/green-hoodie.png'} />
                              <div className="small fw-bold mt-1 text-truncate">{item.name}</div>
                              <div className="small text-muted">تعداد: {item.quantity}</div>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── صفحه علاقه‌مندی‌ها ───────────────────────────────────
export function Favorites() {
  return (
    <div className="container mt-4 text-end">
      <div className="container-fluid" id="page-hero">
        <div className="container py-3">
          <h1>ناحیه کاربری</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
              <li className="breadcrumb-item">ناحیه کاربری</li>
              <li className="breadcrumb-item active">علاقه مندی ها</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-lg-3 mb-3">
            <ProfileSidebar active="favorites" />
          </div>
          <div className="col-12 col-lg-9">
            <div className="custom-container bg-white p-4 rounded-3 shadow-sm text-center py-5">
              <i className="fa fa-heart fa-3x text-danger mb-3"></i>
              <p className="text-muted">محصول علاقه‌مندی ثبت نشده است</p>
              <Link to="/" className="btn btn-primary rounded-pill px-4">مشاهده محصولات</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── صفحه آدرس‌ها ─────────────────────────────────────────
export function Addresses() {
  const [form, setForm] = useState({ province: 'tehran', city: 'tehran', address: '', postal_code: '', receiver: '', tel: '' });
  const [saved, setSaved] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sampleAddresses = [
    { id: 1, title: 'تهران، بلوار ولی عصر', city: 'تهران، تهران', postal: '1234567890', receiver: 'امید کریمی', tel: '02112345678', isDefault: true },
    { id: 2, title: 'تهران، خیابان آزادی', city: 'تهران، تهران', postal: '0987654321', receiver: 'علی محمدی', tel: '02198765432', isDefault: false },
  ];

  return (
    <div className="container mt-4 text-end">
      <div className="container-fluid" id="page-hero">
        <div className="container py-3">
          <h1>ناحیه کاربری</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">صفحه نخست</Link></li>
              <li className="breadcrumb-item">ناحیه کاربری</li>
              <li className="breadcrumb-item active">آدرس های من</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-lg-3 mb-3">
            <ProfileSidebar active="addresses" />
          </div>
          <div className="col-12 col-lg-9">

            {/* فرم آدرس جدید */}
            <div className="custom-container mb-3 p-4 rounded-3 bg-white shadow-sm" id="new-address">
              <h5 className="fw-bold mb-3">افزودن آدرس جدید</h5>
              <hr />
              {saved && <div className="alert alert-success">آدرس با موفقیت ذخیره شد!</div>}
              <form onSubmit={handleSubmit}>
                <div className="row g-2">
                  <div className="col-12 col-md-4">
                    <label className="form-label">استان:</label>
                    <select name="province" className="form-control" value={form.province} onChange={handleChange}>
                      <option value="tehran">تهران</option>
                      <option value="fars">فارس</option>
                      <option value="esfehan">اصفهان</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">شهر:</label>
                    <select name="city" className="form-control" value={form.city} onChange={handleChange}>
                      <option value="tehran">تهران</option>
                      <option value="shiraz">شیراز</option>
                      <option value="esfehan">اصفهان</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-8">
                    <label className="form-label">نشانی کامل:</label>
                    <input type="text" name="address" className="form-control text-end" value={form.address} onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">کد پستی:</label>
                    <input type="text" name="postal_code" className="form-control text-end" value={form.postal_code} onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">تحویل گیرنده:</label>
                    <input type="text" name="receiver" className="form-control text-end" value={form.receiver} onChange={handleChange} />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">تلفن تماس:</label>
                    <input type="text" name="tel" className="form-control text-end" value={form.tel} onChange={handleChange} />
                  </div>
                  <div className="col-12 mt-2">
                    <button type="submit" className="btn btn-primary px-5 rounded-pill">ذخیره آدرس</button>
                  </div>
                </div>
              </form>
            </div>

            {/* لیست آدرس‌های ذخیره شده */}
            <div className="custom-container p-4 rounded-3 bg-white shadow-sm" id="addresses">
              <h5 className="fw-bold mb-3">آدرس های من</h5>
              <hr />
              {sampleAddresses.map(addr => (
                <div key={addr.id} className="address py-3 border-bottom">
                  <div className="row">
                    <div className="col-10">
                      <div className="fw-bold">{addr.title}</div>
                      <div className="text-muted small mt-1">{addr.city}</div>
                      <div className="text-muted small">کد پستی: {addr.postal}</div>
                      <div className="text-muted small">تحویل‌گیرنده: {addr.receiver}</div>
                      <div className="text-muted small">تلفن: {addr.tel}</div>
                    </div>
                    <div className="col-2 d-flex flex-column align-items-start gap-2">
                      {addr.isDefault && <i className="fa fa-check-circle text-warning" title="آدرس پیش‌فرض"></i>}
                      <a href="#"><i className="fa fa-edit text-primary"></i></a>
                      <a href="#" onClick={e => { e.preventDefault(); if(window.confirm('آیا از حذف این آدرس مطمئنید؟')) {} }}>
                        <i className="fa fa-trash-alt text-danger"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}