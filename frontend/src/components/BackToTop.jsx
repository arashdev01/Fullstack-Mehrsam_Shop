import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        zIndex: 9999,
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: '#fcb941',
        color: '#fff',
        fontSize: '18px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      }}
    >
      <i className="fa fa-chevron-up"></i>
    </button>
  );
}