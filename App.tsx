import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackgroundDoodles } from './components/BackgroundDoodles';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { CMSLogin } from './pages/CMSLogin';
import { CMSProvider } from './contexts/CMSContext';

const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    React.useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

const App: React.FC = () => {
  return (
    <CMSProvider>
      <HashRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-white relative">
              <BackgroundDoodles />
              <div className="relative z-10 flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/admin" element={<CMSLogin />} />
                  </Routes>
                  </main>
                  <Footer />
              </div>
          </div>
      </HashRouter>
    </CMSProvider>
  );
};

export default App;