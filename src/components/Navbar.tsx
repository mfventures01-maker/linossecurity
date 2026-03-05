import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Shield, Zap, Lock, Camera, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Insights', path: '/blog' },
  { name: 'Solar', path: '/category/solar', icon: Zap },
  { name: 'CCTV', path: '/category/cctv', icon: Camera },
  { name: 'Access Control', path: '/category/access-control', icon: Lock },
  { name: 'Gate Automation', path: '/category/gate-automation', icon: Shield },
  { name: 'Estate Security', path: '/category/estate-security', icon: Home },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-primary/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-accent p-1.5 rounded-lg">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-white leading-none">LINOS E’</span>
              <span className="text-xs font-display font-bold text-accent tracking-[0.2em]">SECURITY LTD</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  location.pathname === item.path ? 'text-accent' : 'text-white/80'
                )}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="tel:+2340000000000"
              className="flex items-center space-x-2 bg-accent text-primary px-4 py-2 rounded-full font-bold text-sm hover:bg-accent-hover transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Request Quote</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-[72px] bg-primary z-40 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="px-4 pt-8 pb-12 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center space-x-4 p-4 rounded-xl text-lg font-medium transition-colors',
                location.pathname === item.path ? 'bg-accent text-primary' : 'text-white hover:bg-white/5'
              )}
            >
              {item.icon && <item.icon className="w-6 h-6" />}
              <span>{item.name}</span>
            </Link>
          ))}
          <div className="pt-8">
            <a
              href="tel:+2340000000000"
              className="flex items-center justify-center space-x-3 w-full bg-accent text-primary py-4 rounded-xl font-bold text-lg"
            >
              <Phone className="w-6 h-6" />
              <span>Call Abuja Office</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
