import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-display font-bold text-primary mb-6">Contact Our Abuja Office</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Ready to secure your property? Reach out to our team of experts for a free site survey and custom quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-32">
          {/* Contact Cards */}
          <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 text-center">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Call Us</h3>
            <p className="text-gray-500 mb-4">Available Mon-Fri, 8am-6pm</p>
            <a href="tel:+2348000000000" className="text-primary font-bold text-lg hover:text-accent transition-colors">+234 800 LINOS SEC</a>
          </div>

          <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 text-center">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Email Us</h3>
            <p className="text-gray-500 mb-4">We respond within 24 hours</p>
            <a href="mailto:info@linosecurity.com.ng" className="text-primary font-bold text-lg hover:text-accent transition-colors">info@linosecurity.com.ng</a>
          </div>

          <div className="bg-gray-50 p-10 rounded-[2rem] border border-gray-100 text-center">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Visit Us</h3>
            <p className="text-gray-500 mb-4">Abuja Business Plaza</p>
            <p className="text-primary font-bold text-lg">Wuse II, Abuja, Nigeria</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-gray-50"
          >
            <h2 className="text-3xl font-display font-bold text-primary mb-8">Request a Free Site Survey</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-wider">Full Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:outline-none focus:border-accent" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary uppercase tracking-wider">Phone Number</label>
                  <input type="tel" className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:outline-none focus:border-accent" placeholder="+234..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-wider">Property Type</label>
                <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:outline-none focus:border-accent">
                  <option>Residential Home</option>
                  <option>Commercial Office</option>
                  <option>Industrial Site</option>
                  <option>Residential Estate</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary uppercase tracking-wider">Message / Requirements</label>
                <textarea rows={4} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 focus:outline-none focus:border-accent" placeholder="Tell us about your security needs..."></textarea>
              </div>
              <button className="w-full btn-primary py-5 text-lg">Submit Request</button>
            </form>
          </motion.div>

          {/* Map / Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary mb-6">Our Location</h2>
              <div className="aspect-video rounded-[2rem] overflow-hidden bg-gray-100 border border-gray-100 shadow-lg relative">
                {/* Placeholder for Map */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
                    <p className="text-primary font-bold">Google Maps Integration</p>
                    <p className="text-gray-500 text-sm">Abuja Business Plaza, Wuse II</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="bg-primary p-8 rounded-3xl text-white">
                <Clock className="w-8 h-8 text-accent mb-4" />
                <h4 className="font-bold mb-2">Business Hours</h4>
                <p className="text-white/60 text-sm">Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p className="text-white/60 text-sm">Sat: 10:00 AM - 4:00 PM</p>
                <p className="text-white/60 text-sm">Sun: Closed</p>
              </div>
              <div className="bg-accent p-8 rounded-3xl text-primary">
                <MessageCircle className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold mb-2">Direct Chat</h4>
                <p className="text-primary/70 text-sm mb-4">Chat with our technical team on WhatsApp for instant support.</p>
                <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold">Start Chat</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
