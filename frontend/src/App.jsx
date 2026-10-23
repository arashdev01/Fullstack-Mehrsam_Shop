import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// کامپوننت‌های ثابت
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

// صفحه اصلی
import Slider from './components/Slider';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import OnSaleTimer from './components/OnSaleTimer';
import Benefits from './components/Benefits';
import BestSellers from './components/BestSellers';
import OfferBanners from './components/OfferBanners';
import VendorCarousel from './components/VendorCarousel';
import LatestPosts from './components/LatestPosts';
import Newsletter from './components/Newsletter';
import PopupDiscount from './components/PopupDiscount';

// صفحات فروشگاه
// Keep the legacy /shop path, but route shoppers to the live API-backed listing.
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

// حساب کاربری
import Register from './components/Register';
import Login from './components/Login';
import { PersonalInfo, Orders, Favorites, Addresses } from './components/Profile';

// صفحات عمومی
import Contact from './components/Contact';
import About from './components/About';
import FAQ from './components/FAQ';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import ResetPassword from './components/ResetPassword';
import Compare from './components/Compare';
import SupportTicket from './components/SupportTicket';
import ThankYou from './components/ThankYou';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="app-wrapper">

      {/* هدر - همیشه نمایش داده می‌شود */}
      <Header />

      {/* مسیرهای برنامه */}
      <Routes>

        {/* صفحه اصلی */}
        <Route
          path="/"
          element={
            <>
              <Slider />
              <Hero />
              <FeaturedProducts />
              <OnSaleTimer />
              <Benefits />
              <BestSellers />
              <OfferBanners />
              <VendorCarousel />
              <LatestPosts />
              <Newsletter />
              <PopupDiscount />
            </>
          }
        />

        {/* صفحه فروشگاه قدیمی */}
        <Route path="/shop" element={<Navigate to="/products" replace />} />

        {/* لیست تمام محصولات */}
        <Route path="/products" element={<ProductList />} />

        {/* محصولات یک دسته‌بندی خاص */}
        <Route path="/category/:categoryId" element={<ProductList />} />

        {/* صفحه جزئیات یک محصول */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* سبد خرید */}
        <Route path="/cart" element={<Cart />} />

        {/* پرداخت */}
        <Route path="/checkout" element={<Checkout />} />

        {/* پشتیبانی */}
        <Route path="/support" element={<SupportTicket />} />

        {/* نتیجه پرداخت */}
        <Route path="/thankyou" element={<ThankYou />} />

        {/* ثبت‌نام */}
        <Route path="/register" element={<Register />} />

        {/* ورود */}
        <Route path="/login" element={<Login />} />

        {/* پروفایل */}
        <Route path="/profile" element={<PersonalInfo />} />
        <Route path="/profile/orders" element={<Orders />} />
        <Route path="/profile/favorites" element={<Favorites />} />
        <Route path="/profile/addresses" element={<Addresses />} />

        {/* صفحات عمومی */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />

        {/* وبلاگ */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />

        {/* بازیابی رمز عبور */}
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* مقایسه محصولات */}
        <Route path="/compare" element={<Compare />} />

        {/* مسیر نامعتبر */}
        <Route path="*" element={<NotFound />} />

      </Routes>

      {/* فوتر - همیشه نمایش داده می‌شود */}
      <Footer />

      {/* دکمه بازگشت به بالا */}
      <BackToTop />

    </div>
  );
}

export default App;