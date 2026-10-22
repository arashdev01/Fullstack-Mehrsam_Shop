import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'هودی',       icon: '🧥', slug: 'hoodie' },
  { id: 2, name: 'شلوار',      icon: '👖', slug: 'pants'  },
  { id: 3, name: 'تی‌شرت',    icon: '👕', slug: 'tshirt' },
  { id: 4, name: 'کیف زنانه', icon: '👜', slug: 'handbag' },
  { id: 5, name: 'کفش زنانه', icon: '👠', slug: 'women-shoes' },
  { id: 6, name: 'کفش مردانه',icon: '👞', slug: 'men-shoes' },
];

export default function CategoryBoxes() {
  return (
    <section id="category-boxes" className="my-4">
      <style>{`
        #category-boxes .cat-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 18px 20px;
          text-decoration: none;
          color: #333;
          font-size: 15px;
          font-weight: 600;
          transition: box-shadow 0.2s, transform 0.2s;
          height: 100%;
        }
        #category-boxes .cat-item:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          transform: translateY(-2px);
          color: #333;
        }
        #category-boxes .cat-icon {
          font-size: 28px;
          margin-right: 0;
          margin-left: 10px;
        }
      `}</style>

      <div className="container-fluid px-3 px-lg-4">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-6 g-3">
          {categories.map(cat => (
            <div key={cat.id} className="col">
              <Link to={`/products?search=${encodeURIComponent(cat.name)}`} className="cat-item">
                <span>{cat.name}</span>
                <span className="cat-icon">{cat.icon}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
