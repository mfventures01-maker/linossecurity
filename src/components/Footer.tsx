import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-accent p-1.5 rounded-lg">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold text-white leading-none">LINOS E’</span>
                <span className="text-xs font-display font-bold text-accent tracking-[0.2em]">SECURITY LTD</span>
              </div>
            </Link>
            <p className="text-white/60 leading-relaxed">
              Premium automation and security authority in Abuja, Nigeria. We provide high-end solar, CCTV, and access control solutions.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Quick Links</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link to="/category/solar" className="hover:text-accent transition-colors">Solar Power Systems</Link></li>
              <li><Link to="/category/cctv" className="hover:text-accent transition-colors">CCTV & Surveillance</Link></li>
              <li><Link to="/category/access-control" className="hover:text-accent transition-colors">Access Control</Link></li>
              <li><Link to="/category/gate-automation" className="hover:text-accent transition-colors">Gate Automation</Link></li>
              <li><Link to="/category/estate-security" className="hover:text-accent transition-colors">Estate Security</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Abuja Office</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <span>Suite 204, Abuja Business Plaza, Wuse II, Abuja, Nigeria</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+234 800 LINOS SEC</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>info@linosecurity.com.ng</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent">Newsletter</h4>
            <p className="text-white/60 mb-4 text-sm">Subscribe to get security tips and product updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-accent"
              />
              <button className="bg-accent text-primary px-4 py-2 rounded-r-lg font-bold hover:bg-accent-hover transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm gap-4">
          <p>© {new Date().getFullYear()} Linos E’ Security Ltd. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
