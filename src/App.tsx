import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './theme/ThemeContext';
import { LanguageProvider } from './theme/LanguageContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <Navbar />
            <main className="flex-grow pt-[--header-height]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />

            <a
              href="https://wa.me/237654458996?text=Hello%20Z-TECH%2C%20I%20would%20love%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105 hover:shadow-[0_16px_35px_rgba(37,211,102,0.45)]"
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.199-.298.298-.497.099-.2.05-.372-.025-.521-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.521.074-.793.372-.273.297-1.043 1.021-1.043 2.485 0 1.464 1.067 2.885 1.216 3.083.149.198 2.099 3.2 5.076 4.487.709.306 1.262.49 1.694.627.712.227 1.36.195 1.872.119.572-.086 1.758-.719 2.006-1.413.248-.694.248-1.287.173-1.413-.074-.126-.273-.198-.57-.347m-5.38 7.62h-.001a9.987 9.987 0 0 1-5.08-1.38L2.5 20.5l1.4-4.97A9.97 9.97 0 0 1 2.5 12.01c0-5.52 4.48-10 10-10s10 4.48 10 10c0 5.52-4.48 10-10 10" />
              </svg>
            </a>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
