import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Shield, Zap, Lock, Camera, Home, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const servicesItems = [
  { name: 'Solar Solutions', path: '/category/solar', icon: Zap },
  { name: 'CCTV Systems', path: '/category/cctv', icon: Camera },
  { name: 'Access Control', path: '/category/access-control', icon: Lock },
  { name: 'Gate Automation', path: '/category/gate-automation', icon: Shield },
  { name: 'Estate Security', path: '/category/estate-security', icon: Home },
];

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', isDropdown: true },
  { name: 'Insights', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
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
              item.isDropdown ? (
                <div
                  key={item.name}
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="flex items-center space-x-1 text-sm font-medium text-white/80 hover:text-accent py-2">
                    <span>{item.name}</span>
                    <ChevronDown className={cn("w-4 h-4 transition-transform", isServicesOpen && "rotate-180")} />
                  </button>

                  {/* Dropdown Menu */}
                  <div className={cn(
                    "absolute top-full left-0 w-64 bg-primary/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-2 transition-all duration-300 transform",
                    isServicesOpen ? "opacity-100 translate-y-2" : "opacity-0 translate-y-10 pointer-events-none"
                  )}>
                    {servicesItems.map((service) => (
                      <Link
                        key={service.name}
                        to={service.path}
                        className="flex items-center space-x-4 px-6 py-4 hover:bg-white/5 transition-colors group/item"
                      >
                        <service.icon className="w-5 h-5 text-accent group-hover/item:scale-110 transition-transform" />
                        <span className="text-white/80 group-hover/item:text-white font-medium text-sm">{service.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path!}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-accent',
                    location.pathname === item.path ? 'text-accent' : 'text-white/80'
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
            <a
              href="tel:+2348000000000"
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
        <div className="px-4 pt-8 pb-12 space-y-4 overflow-y-auto max-h-[calc(100vh-72px)]">
          {navItems.map((item) => (
            item.isDropdown ? (
              <div key={item.name} className="space-y-2">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full p-4 text-white text-lg font-medium"
                >
                  <span>{item.name}</span>
                  <ChevronDown className={cn("transition-transform", isServicesOpen && "rotate-180")} />
                </button>
                <div className={cn(
                  "space-y-2 pl-4 transition-all duration-300",
                  isServicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                )}>
                  {servicesItems.map((service) => (
                    <Link
                      key={service.name}
                      to={service.path}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-4 p-4 text-white/60 text-base font-medium hover:text-white"
                    >
                      <service.icon className="w-5 h-5 text-accent" />
                      <span>{service.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.path!}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center space-x-4 p-4 rounded-xl text-lg font-medium transition-colors',
                  location.pathname === item.path ? 'bg-accent text-primary' : 'text-white hover:bg-white/5'
                )}
              >
                <span>{item.name}</span>
              </Link>
            )
          ))}
          <div className="pt-8">
            <a
              href="tel:+2348000000000"
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
