import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Menu, 
  X, 
  Phone, 
  ShieldCheck, 
  Lightbulb, 
  Home, 
  Building2, 
  Wrench, 
  Star,
  ArrowRight,
  Clock,
  MapPin,
  Mail,
  Download
} from 'lucide-react';
import ServiceRequestForm from './components/ServiceRequestForm';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-amber-200 selection:text-slate-900">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/logo.png" 
                alt="3Gen Electric" 
                loading="eager"
                className="h-20 md:h-24 w-auto object-contain"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* Fallback Text Logo (hidden by default if image loads) */}
              <div className="hidden flex items-center gap-2">
                <div className="bg-amber-500 p-2 rounded-lg group-hover:bg-amber-400 transition-colors">
                  <Zap className="w-6 h-6 text-slate-900 fill-slate-900" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-display font-bold leading-none tracking-tight text-slate-900">
                    3GEN
                  </span>
                  <span className="text-xs font-bold tracking-widest uppercase text-slate-600">
                    Electric
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['Services', 'About', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-sm font-medium uppercase tracking-wide hover:text-amber-500 transition-colors text-slate-700"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-5 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all transform hover:scale-105 active:scale-95"
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-500 hover:text-amber-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-900 pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {['Services', 'About', 'Testimonials', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-2xl font-display font-bold text-white hover:text-amber-500 transition-colors"
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-amber-500 text-slate-900 px-6 py-4 rounded-xl font-bold text-lg uppercase tracking-wide mt-4"
              >
                Request Service
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-amber-500 transform skew-x-12 translate-x-1/4"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Available for Emergency Service
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-slate-900 leading-[0.9] mb-6">
                Safe, Reliable Power <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                  for Greater Moncton.
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
                3Gen Electric serves Moncton, Dieppe, Riverview, and nearby communities with professional residential and light commercial electrical work—done with pride and attention to detail.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                >
                  Request Service
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:border-amber-500 hover:text-amber-600 transition-all"
                >
                  View Services
                </button>
              </div>
              
              <div className="mt-10 flex items-center gap-6 text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
                  Licensed & Insured
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  5-Star Rated
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="/hero.png" 
                  alt="Electrician working on panel" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-amber-500 p-3 rounded-full">
                      <Phone className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                      <p className="text-slate-300 text-sm font-medium uppercase tracking-wider">call us now</p>
                      <p className="text-white text-2xl font-display font-bold">(506) 899-8818</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -z-10 top-10 -right-10 w-full h-full bg-slate-200 rounded-2xl"></div>
              <div className="absolute -z-20 -bottom-10 -left-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3">Our Expertise</h2>
            <h3 className="text-4xl font-display font-bold text-slate-900 mb-4">Comprehensive Electrical Solutions</h3>
            <p className="text-slate-600 text-lg">From simple home repairs to complex industrial installations, our team has the experience to handle it all.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Home className="w-8 h-8" />,
                title: "Residential",
                desc: "Complete home wiring, panel upgrades, lighting design, and smart home integration.",
                features: ["Panel Upgrades", "EV Chargers", "New dedicated circuits and outlets", "Safety Inspections"]
              },
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Commercial",
                desc: "Reliable power solutions for offices, retail spaces, and commercial properties.",
                features: ["Tenant improvements", "LED lights retrofit", "Additional power circuits", "Panel upgrades"]
              },
              {
                icon: <Wrench className="w-8 h-8" />,
                title: "Maintenance",
                desc: "Proactive maintenance and rapid repair services to keep your systems running.",
                features: ["24/7 Emergency", "Troubleshooting", "Code Compliance", "Circuit Repair"]
              }
            ].map((service, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-slate-50 hover:bg-slate-900 transition-all duration-300 border border-slate-100 hover:shadow-xl">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-amber-500 transition-colors">
                  <div className="text-amber-500 group-hover:text-slate-900 transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h4 className="text-2xl font-display font-bold text-slate-900 group-hover:text-white mb-3 transition-colors">{service.title}</h4>
                <p className="text-slate-600 group-hover:text-slate-400 mb-6 transition-colors">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm font-medium text-slate-700 group-hover:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Stats Section */}
      <section id="about" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3">About 3Gen Electric</h2>
              <h3 className="text-4xl font-display font-bold mb-6">Built on Family Values,<br />Powered by Expertise.</h3>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  Built on a long tradition of skilled trades and pride in workmanship, 3Gen Electric started with a simple promise: do the job right, every time. Today, the next generation continues that legacy—bringing the same care, reliability, and attention to detail to every project.
                </p>
                <p>
                  To us, electrical work isn’t just about wires and circuits. It’s about the safety and comfort of your home, and the reliability that keeps your business running smoothly. That’s why we never cut corners, follow code and best practices, and stand behind our work from start to finish.
                </p>
              </div>
              
              <div className="mt-10">
                <div>
                  <div className="text-4xl font-display font-bold text-amber-500 mb-1">65+</div>
                  <div className="text-sm text-slate-400 uppercase tracking-wider">years combined trade experience</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1558402529-d2638a7023e9?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl object-cover h-64 w-full" alt="Electrician tools" />
                <img src="https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=1974&auto=format&fit=crop" className="rounded-2xl object-cover h-64 w-full mt-8" alt="Modern lighting" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3">Testimonials</h2>
            <h3 className="text-4xl font-display font-bold text-slate-900">Trusted by Your Neighbors</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "3Gen showed up fast during a power issue and had us back up shortly after. Professional service.",
                author: "Sarah Jenkins",
                role: "Homeowner"
              },
              {
                quote: "Lighting retrofit was done professionally and on time. Everything works as expected.",
                author: "Michael Ross",
                role: "Property Manager"
              },
              {
                quote: "Fair pricing and clear communication. They installed our EV charger and completed a panel upgrade with no issues.",
                author: "David Chen",
                role: "Small Business Owner"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, starI) => <Star key={starI} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 mb-6 italic">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-slate-900">{t.author}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Form Section */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-3">Contact Us</h2>
                <h3 className="text-4xl font-display font-bold text-slate-900 mb-4">Let's Get Started</h3>
                <p className="text-slate-600">
                  Ready to upgrade your electrical system? Fill out the form or contact us directly using the information below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Phone</p>
                    <p className="text-slate-600">(506) 899-8818</p>
                    <p className="text-xs text-amber-600 font-medium mt-1">24/7 Emergency Service Available</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Email</p>
                    <p className="text-slate-600">3genelectriccanada@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Hours</p>
                    <p className="text-slate-600">Mon-Fri: 7am - 6pm</p>
                    <p className="text-slate-600">Sat: 8am - 2pm</p>
                    <p className="text-slate-600">Sun: Emergency Only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Component */}
            <div className="lg:col-span-3">
              <ServiceRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white p-2 rounded-lg inline-block">
                  <img 
                    src="/logo.png" 
                    alt="3Gen Electric" 
                    loading="lazy"
                    className="h-10 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.parentElement!.style.display = 'none';
                      e.currentTarget.parentElement!.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                </div>
                {/* Fallback Text Logo */}
                <div className="hidden flex items-center gap-2">
                  <div className="bg-amber-500 p-1.5 rounded">
                    <Zap className="w-5 h-5 text-slate-900 fill-slate-900" />
                  </div>
                  <span className="text-xl font-display font-bold text-white">3GEN Electric</span>
                </div>
              </div>
              <p className="max-w-xs">
                Providing top-tier electrical services for residential and commercial clients across Greater Moncton — including Moncton, Dieppe, Riverview, and surrounding communities.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Residential</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Commercial</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Emergency</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">Terms of Service</a></li>
                <li><span className="hover:text-amber-500 transition-colors">Lic No.- Nº de permis: 892498</span></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>&copy; {new Date().getFullYear()} 3Gen Electric. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/api/download-source" className="text-slate-600 hover:text-amber-500 transition-colors flex items-center gap-1">
                <Download className="w-4 h-4" />
                Download Source
              </a>
              <p>Designed for Excellence.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
