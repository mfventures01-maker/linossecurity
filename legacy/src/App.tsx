import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import About from './pages/About';

// New Blog & Admin Pages
import BlogHome from './pages/BlogHome';
import BlogPost from './pages/BlogPost';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PostList from './pages/admin/PostList';
import BlogEditor from './pages/admin/BlogEditor';
import SiteSettings from './pages/admin/SiteSettings';
import { AuthProvider } from './lib/useAuth';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageWrapper({ children, showNav = true }: { children: React.ReactNode, showNav?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col">
      {showNav && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {showNav && <Footer />}
      {showNav && <WhatsAppButton />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/category/:categorySlug" element={<PageWrapper><CategoryPage /></PageWrapper>} />
          <Route path="/product/:slug" element={<PageWrapper><ProductDetails /></PageWrapper>} />
          <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />

          <Route path="/blog" element={<PageWrapper><BlogHome /></PageWrapper>} />
          <Route path="/blog/:slug" element={<PageWrapper><BlogPost /></PageWrapper>} />
          <Route path="/blog/category/:category" element={<PageWrapper><BlogHome /></PageWrapper>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/blog/posts" element={<PostList />} />
          <Route path="/admin/blog/create" element={<BlogEditor />} />
          <Route path="/admin/blog/edit/:id" element={<BlogEditor />} />
          <Route path="/admin/settings" element={<SiteSettings />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
