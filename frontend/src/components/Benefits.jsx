export default function Benefits() {
  const items = [
    { img: '/images/benefits/benefit1.png', label: 'پشتیبانی کامل' },
    { img: '/images/benefits/benefit2.png', label: 'اصالت کالا' },
    { img: '/images/benefits/benefit3.png', label: 'بازگشت وجه' },
    { img: '/images/benefits/benefit4.png', label: 'ارسال رایگان' },
  ];

  return (
    <section id="benefits" className="pt-4">
      <style>{`
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          max-width: 950px;
          margin: 5px auto;
        }

        .benefit-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background-color: #6b459b;
          border-radius: 16px;
          padding: 8px 10px;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }

        .benefit-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(107, 69, 155, 0.18);
        }

        .benefit-card img {
          width: 52px;
          height: 52px;
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
            gap: 12px; 
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