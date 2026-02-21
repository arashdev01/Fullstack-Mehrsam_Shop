import React from 'react'
import { Routes, Route } from 'react-router-dom'

// کامپوننت‌های ثابت (همیشه نمایش داده می‌شن)
import Header from './components/Header'
import Footer from './components/Footer'
import Slider from './components/Slider'

// صفحات مختلف
import ShopPage from './pages/ShopPage';
import Hero from './components/Hero'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Register from './components/Register'
import FeaturedProducts from './components/FeaturedProducts'
import OfferBanners from './components/OfferBanners'
import VendorCarousel from './components/VendorCarousel'
import Login from './components/Login'
import { PersonalInfo, Orders, Favorites, Addresses } from './components/Profile'
import BackToTop from './components/BackToTop'
import Contact from './components/Contact'
import About from './components/About'
import FAQ from './components/FAQ'
import Blog from './components/Blog'
import BlogPost from './components/BlogPost'
import ResetPassword from './components/ResetPassword'
import NotFound from './components/NotFound'
import Compare from './components/Compare'
import SupportTicket from './components/SupportTicket';
import ThankYou from './components/ThankYou'
import Newsletter from './components/Newsletter'
import PopupDiscount from './components/PopupDiscount'
import LatestPosts from './components/LatestPosts'
import Benefits from './components/Benefits'
import OnSaleTimer from './components/OnSaleTimer'
import BestSellers from './components/BestSellers'


function App() {
  return (
    <div className="app-wrapper">

      {/* هدر - همیشه بالای صفحه */}
      <Header />

      {/* اسلایدر - فقط در صفحه اصلی نشان داده می‌شه */}
      <Routes>
        <Route path="/" element={<Slider />} />
      </Routes>

      {/* محتوای اصلی - بسته به آدرس عوض می‌شه */}
      <Routes>
        {/* صفحه اصلی */}
        <Route path="/" element={
          <>
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
        } />
        <Route path="/shop" element={<ShopPage />} />
        {/* محصولات یک دسته‌بندی خاص */}
        <Route path="/category/:categoryId" element={<ProductList />} />

        {/* صفحه جزئیات یک محصول */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* سبد خرید */}
        <Route path="/cart" element={<Cart />} />

        {/* پرداخت */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/support" element={<SupportTicket />} />
        <Route path="/thankyou" element={<ThankYou />} />
        {/* ثبت‌نام */}
        <Route path="/register" element={<Register />} />

          {/* ورود */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PersonalInfo />} />
        <Route path="/profile/orders" element={<Orders />} />
        <Route path="/profile/favorites" element={<Favorites />} />
        <Route path="/profile/addresses" element={<Addresses />} />
      
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/compare" element={<Compare />} />

      </Routes>
      
      {/* فوتر - همیشه پایین صفحه */}
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App