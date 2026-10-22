export default function OfferBanners() {
  const banners = [
    {
      img: '/images/slider/baner1.webp',
      badge: 'کالکشن جدید',
      title: 'استایل جین روزمره',
      subtitle: 'پوشاک منتخب مهرسام',
      bg: '#6b459b',
      link: '/products',
    },
    {
      img: '/images/slider/baner2.webp',
      badge: 'انتخاب فصل',
      title: 'استایل زنانه و مردانه',
      subtitle: 'جزئیاتی برای استایل شما',
      bg: '#dca18b',
      link: '/products',
    },
  ];

  return (
    <section className="container mt-5">
      <div className="row g-3">
        {banners.map((b, i) => (
          <div key={i} className="col-12 col-md-6">
            <a href={b.link} style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: b.bg,
                borderRadius: '14px',
                height: '96px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflow: 'hidden',
                padding: '0 0 0 12px',
              }}>
                {/* تصویر سمت چپ */}
                <img
                  src={b.img}
                  alt={b.title}
                  style={{
                    height: '96px',
                    width: '35%',
                    objectFit: 'contain',
                    flexShrink: 0,
                  }}
                  onError={e => { e.target.style.display = 'none'; }}
                />

                {/* متن سمت راست */}
                <div style={{ textAlign: 'right', padding: '0 16px', flex: 1 }}>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: '6px',
                  }}>{b.badge}</div>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: 'white',
                    lineHeight: 1.9,
                  }}>{b.title}</div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'white',
                  }}>{b.subtitle}</div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}