import useSiteContent from '../useSiteContent';

export default function Benefits() {
  const content = useSiteContent();
  const items = [
    { img: content.benefit1_image || '/images/benefits/benefit1.png', label: content.benefit1_label || 'پشتیبانی کامل' },
    { img: content.benefit2_image || '/images/benefits/benefit2.png', label: content.benefit2_label || 'اصالت کالا' },
    { img: content.benefit3_image || '/images/benefits/benefit3.png', label: content.benefit3_label || 'بازگشت وجه' },
    { img: content.benefit4_image || '/images/benefits/benefit4.png', label: content.benefit4_label || 'ارسال رایگان' },
  ];

  return (
    <section id="benefits" className="pt-4">
      <style>{`
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 75px;
          max-width: 950px;
          margin: 5px;
        }

        .benefit-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background-color: #0c32cc;
          border-radius: 15px;
          padding: 8px 10px;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }

        .benefit-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(19, 34, 60, 0.72);
        }

        .benefit-card img {
          width: 64px;
          height: 64px;
          object-fit: contain;
        }

        .benefit-card span {
          color: white;
          font-size: 13px;
          font-weight: bold;
          text-align: center;
        }

        @media (max-width: 768px) {
          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 44px; 
          }

        }

        @media (min-width: 992px) {
                .benefits-grid {
                  margin-left: auto !important;
                  margin-right: auto !important;
                  text-align: center;
                }
              }
      `}
      </style>

      <div className="container">
        <div className="benefits-grid">
          {items.map((item, i) => (
            <div key={i} className="benefit-card">
              <img
                src={item.img}
                alt={item.label}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="row pt-2"><div className="col"><hr /></div></div>
      </div>
    </section>
  );
}