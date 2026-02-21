export default function VendorCarousel() {
  const vendors = [
    { id: 1, name: 'برند ۱', image: '/images/team/adidas.png' },
    { id: 2, name: 'برند ۲', image: '/images/team/puma.png' },
    { id: 3, name: 'برند ۳', image: '/images/team/nike.png' },
    { id: 4, name: 'برند ۴', image: '/images/team/reebok.png' },
    { id: 5, name: 'برند ۵', image: '/images/team/lv.png' },
  ];

  return (
    <section className="container mt-5 mb-4">
      <style>{`
        .vendor-section h6 {
          font-size: 15px;
          color: #fff;
          border-color: rgba(255,255,255,0.2) !important;
        }

        .vendor-track-wrapper {
          overflow: hidden;
          width: 100%;
          direction: ltr;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .vendor-track {
          display: flex;
          gap: 100px;
          width: max-content;
          animation: vendorScroll 20s linear infinite;
        }

        .vendor-track:hover {
          animation-play-state: paused;
        }

        @keyframes vendorScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .vendor-card {
          min-width: 150px;
          background: rgba(200, 187, 187, 0.95);
          border-radius: 16px;
          padding: 18px 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 50px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.43);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }

        .vendor-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.68);
        }

        .vendor-card img {
          width: 90px;
          height: 55px;
          object-fit: contain;
        }

        .vendor-name {
          font-size: 12px;
          font-weight: bold;
          color: #334;
          display: none;
          
        }
      `}</style>

      <div className="vendor-section">
        <h5 className="fw-bold text-end mb-4 border-bottom pb-2 ">برندهای موجود</h5>

        <div className="vendor-track-wrapper">
          <div className="vendor-track">
            {[...vendors, ...vendors].map((vendor, i) => (
              <div key={i} className="vendor-card">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="vendor-name">{vendor.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}