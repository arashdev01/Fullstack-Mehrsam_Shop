import React, { useState, useEffect } from "react";

const Sidebar = ({ categories = [], onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [price, setPrice] = useState(10000000);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brands = ["سامسونگ", "شیائومی", "اپل"];

  /* ارسال فیلترها به کامپوننت والد */
  useEffect(() => {
    onFilterChange?.({
      category: selectedCategory,
      max_price: price,
      brands: selectedBrands,
    });
  }, [selectedCategory, price, selectedBrands]);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="bg-light p-3 rounded-4 shadow-sm">

      {/* دسته‌بندی */}
      <div className="bg-white p-3 mb-4 rounded-4 shadow-sm">
        <div className="fw-bold mb-3 border-bottom pb-2">
          دسته‌بندی محصولات
        </div>

        <ul className="list-unstyled m-0">
          {categories.map((cat) => (
            <li key={cat.id} className="mb-2">
              <button
                className={`btn w-100 text-end ${
                  selectedCategory === cat.id
                    ? "btn-primary"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* قیمت */}
      <div className="bg-white p-3 mb-4 rounded-4 shadow-sm">
        <div className="fw-bold mb-3 border-bottom pb-2">
          فیلتر قیمت
        </div>

        <input
          type="range"
          className="form-range"
          min="0"
          max="10000000"
          step="500000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <div className="d-flex justify-content-between small">
          <span>۰</span>
          <span>
            {new Intl.NumberFormat("fa-IR").format(price)} تومان
          </span>
        </div>
      </div>

      {/* برند */}
      <div className="bg-white p-3 rounded-4 shadow-sm">
        <div className="fw-bold mb-3 border-bottom pb-2">
          برندها
        </div>

        {brands.map((brand) => (
          <div className="form-check mb-2" key={brand}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
              id={brand}
            />
            <label className="form-check-label" htmlFor={brand}>
              {brand}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
