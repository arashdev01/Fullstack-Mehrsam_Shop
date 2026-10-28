import useSiteContent from '../useSiteContent';

export default function OfferBanners() {
  const content = useSiteContent();
  const banners = [
    {
      img: content.offer1_image || '/images/slider/baner1.webp',
      badge: content.offer1_badge || 'تخفیف ۲۰٪   ', 
      title: content.offer1_title || '  فروش ویژه عید نوروز',
      subtitle: content.offer1_subtitle || 'انواع پوشاک مـردانه  ', 
      bg: '#044cc8',
      link: '/products',
    },
    {
      img: content.offer2_image || '/images/slider/baner2.webp',
      badge: content.offer2_badge || 'تخفیف ویژه برای  ', 
      title: content.offer2_title || ' بانـوان',
      subtitle: content.offer2_subtitle || ' انواع پوشاک زنـانه',
      bg: '#e7240efd',
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
                height: '79px',
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
                    height: '80px',
                    width: '180px',
                    objectFit: 'cover',
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