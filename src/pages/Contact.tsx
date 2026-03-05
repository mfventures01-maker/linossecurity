import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, ShieldCheck } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    service: 'Solar',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Your inquiry has been received. Our Abuja team will contact you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 italic">
              Connect <span className="text-accent">Direct</span>.
            </h1>
            <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed">
              Secure your luxury property today. Our technical specialists in Abuja are ready to design your custom security and power infrastructure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Info Cards */}
            <div className="space-y-8">
              <div className="p-10 rounded-[2rem] bg-gray-50 border border-gray-100 space-y-8">
                <h2 className="text-3xl font-display font-bold text-primary">Office Headquarters</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-6">
                    <div className="bg-accent p-3 rounded-xl">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg">Abuja, Nigeria</h4>
                      <p className="text-gray-500 leading-relaxed">Suit 202, 2nd Floor, Bright Star Plaza, 50 Ebitu Ukiwe St, Jabi 900108, Abuja, Federal Capital Territory</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-accent p-3 rounded-xl">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg">Technical Hotline</h4>
                      <p className="text-gray-500 leading-relaxed">+234 800 000 0000</p>
                      <p className="text-accent font-bold text-sm mt-1 uppercase tracking-widest">Available 24/7 for Active Clients</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-accent p-3 rounded-xl">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg">Electronic Inquiry</h4>
                      <p className="text-gray-500 leading-relaxed">info@linose-security.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-6">
                    <div className="bg-accent p-3 rounded-xl">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-lg">Technical Support Hours</h4>
                      <p className="text-gray-500 leading-relaxed italic">Mon - Fri: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-500 leading-relaxed italic">Sat: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 rounded-[2rem] bg-primary text-white flex items-center justify-between group overflow-hidden relative">
                <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-2">Instant Consultation</h4>
                  <p className="text-white/40 text-sm">Chat directly with a security architect on WhatsApp.</p>
                </div>
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 p-5 rounded-2xl relative z-10 hover:scale-110 transition-transform shadow-xl shadow-green-500/20"
                >
                  <MessageCircle className="w-10 h-10" />
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div className="p-10 rounded-[2rem] bg-white border border-gray-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16" />

              <h3 className="text-2xl font-display font-bold text-primary mb-8 flex items-center space-x-3">
                <ShieldCheck className="w-7 h-7 text-accent" />
                <span>Request Technical Design</span>
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium text-primary placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Phone No.</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234..."
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium text-primary placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Email Address</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium text-primary placeholder:text-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Infrastructure Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium text-primary"
                  >
                    <option>Solar Solutions</option>
                    <option>CCTV Systems</option>
                    <option>Access Control</option>
                    <option>Gate Automation</option>
                    <option>Estate Security</option>
                    <option>Full Security Audit</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-2">Message & Vision</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your property..."
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-medium text-primary placeholder:text-gray-300 resize-none"
                  />
                </div>

                <button type="submit" className="w-full btn-primary py-5 rounded-2xl shadow-xl shadow-accent/20 space-x-3 flex items-center justify-center group active:scale-95 transition-all">
                  <span className="text-lg">Deploy Request</span>
                  <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
